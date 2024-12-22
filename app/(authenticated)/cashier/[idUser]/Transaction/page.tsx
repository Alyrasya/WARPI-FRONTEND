"use client";
import React, { Key, useEffect, useState } from "react";
import { Button, Modal, Pagination, message } from "antd";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { transactionRepository } from "#/repository/transaction";
import { PaymentStatus } from "#/repository/dashboard";
import { useParams } from "next/navigation";
import Image from "next/image";
import { transaction } from "mobx";

interface PaymentMethod {
  id: Key | null | undefined;
  method_name: string;
  id_method: string | null;
}

interface Product {
  id: string;
  name: string;
  price: string;
}

interface Order {
  qty: number;
  product: Product;
}

interface Transaction {
  id: string;
  total_price_transaction: string;
  change_money: string;
  cash: string;
  name_order: string;
  no_order: number;
  payment_status: string;
  createdAt: string;
  payment_method: string;
  orders: Order[];
}

const TransactionPage = () => {
  const { data: dataMethods } = transactionRepository.hooks.useGetAllMethods();
  const params = useParams();
  const [filter, setFilter] = useState<"Pending" | "Unpaid" | "Paid">("Unpaid");
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [cash, setCash] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [pageSize, setPageSize] = useState(9); // Jumlah item per halaman
  const [totalItems, setTotalItems] = useState(60); // Contoh total data (dari API)

  //memanggil editTransaction function
  const handleSubmitPayment = async () => {
    let id_user = params?.idUser;

    if (Array.isArray(id_user)) {
      id_user = id_user[0];
    }

    if (!id_user) {
      message.error("User ID is missing.");
      return;
    }

    if (!selectedTransaction) {
      message.error("No transaction selected.");
      return;
    }

    if (!paymentMethod) {
      message.error("Please select a payment method.");
      return;
    }

    // Jika metode pembayaran bukan QR Code, validasi cash
    if (paymentMethod !== "qris" && (!cash || cash <= 0)) {
      message.error("Please enter a valid cash amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedMethod = dataMethods?.find(
        (method: { method_name: string }) =>
          method.method_name === paymentMethod
      );

      if (!selectedMethod || !selectedMethod.id) {
        message.error("Invalid payment method selected.");
        return;
      }

      const payload = {
        id_transaction: selectedTransaction.id,
        id_user: id_user,
        action: "paid",
        id_method: selectedMethod.id,
        cash: paymentMethod === "QR Code" ? null : cash, // Atur cash ke null jika QR Code
      };

      console.log("Submitting payment with the following data:", payload);

      const response = await transactionRepository.api.editTransaction(
        { id_transaction: selectedTransaction.id, id_user: id_user },
        { cash, action: "paid", id_method: selectedMethod.id }
      );

      console.log("API response:", response);
      message.success("Payment successful!");
      handleClose();
      window.location.reload();
    } catch (error: unknown) {
      console.error("Error processing payment:", error);

      if (error instanceof Error) {
        message.error(`Error: ${error.message || "Unknown error"}`);
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  //useEfect pagination
  // Panggil API untuk transaksi
  const { data, error } =
    transactionRepository.hooks.useGetAllTransactionCashier({
      page: currentPage,
      page_size: pageSize,
      payment_status: filter.toLowerCase() as PaymentStatus,
    });

  // Atur totalItems otomatis dari API
  useEffect(() => {
    if (data?.total) {
      setTotalItems(data.total); // Ambil nilai total dari API
    }
  }, [data?.total]); // Hanya dijalankan ketika `data.total` berubah

  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page); // Perbarui halaman
    if (size) setPageSize(size); // Perbarui ukuran halaman jika berubah
  };

  if (error) return <div>Error loading transactions</div>;
  if (!data) return <div>Loading...</div>;

  const transactions: Transaction[] = Array.isArray(data?.data)
    ? data.data
    : [];
  if (error) return <div>Error loading transactions</div>;
  if (!data) return <div>Loading...</div>;

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const showModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = async () => {
    let id_user = params?.idUser;

    if (Array.isArray(id_user)) {
      id_user = id_user[0];
    }

    if (!id_user) {
      message.error("User ID is missing.");
      return;
    }

    if (!selectedTransaction) {
      message.error("No transaction selected.");
      return;
    }

    // Set the isSubmitting state to true to handle loading state
    setIsSubmitting(true);

    try {
      // Log the cancel operation for debugging
      console.log("Canceling payment with the following data:");
      console.log({
        id_transaction: selectedTransaction.id,
        id_user: id_user,
        action: "pending",
        id_method: null, // Set method_id as null
      });

      // Send the request to the API to update the transaction to pending
      const response = await transactionRepository.api.editTransaction(
        { id_transaction: selectedTransaction.id, id_user: id_user },
        { action: "pending", id_method: null }
      );

      console.log("API response:", response);
      message.success("Transaction status updated to pending.");
      setIsModalVisible(false);
      setSelectedTransaction(null);
      setCash(null); // Reset input cash
      setPaymentMethod(null); // Reset payment method
      window.location.reload();
    } catch (error: unknown) {
      console.error("Error updating transaction:", error);

      if (error instanceof Error) {
        message.error(`Error: ${error.message || "Unknown error"}`);
      } else {
        message.error("An unexpected error occurred.");
      }
    } finally {
      // Reset the submitting state
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
    setCash(null); // Reset input cash
    setPaymentMethod(null); // Reset payment method
  };

  const formatCurrency = (value: string | number | bigint) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(typeof value === "string" ? parseFloat(value) : value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  // Filter transaksi berdasarkan pencarian langsung saat rendering
  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction.name_order.toLowerCase().includes(search.toLowerCase())
    )
    .filter((transaction) => {
      if (["Unpaid", "Pending"].includes(filter)) {
        return (
          transaction.payment_status.toLowerCase() === filter.toLowerCase() &&
          isToday(transaction.createdAt)
        );
      }
      return transaction.payment_status.toLowerCase() === filter.toLowerCase();
    });

  return (
    <div className="p-4 min-h-screen">
      {/* Filter & Search */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {["Pending", "Unpaid", "Paid"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as "Pending" | "Unpaid" | "Paid")}
              className={`px-4 py-2 mx-1 ${
                filter === status ? "bg-[#543310] text-white" : "bg-white"
              } rounded`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-64"
          />
          <CiSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-md">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 shadow rounded flex flex-col justify-between relative"
            >
              <div>
                {/* No Order */}
                <div className="absolute top-2 left-2 bg-[#543310] text-white font-bold text-sm w-10 h-10 flex items-center justify-center rounded-md">
                  {transaction.no_order}
                </div>

                {/* Order Name and Status */}
                <div className="flex justify-between items-center ml-12 mb-2">
                  <h3 className="text-lg font-semibold">
                    {transaction.name_order}
                  </h3>
                  <span
                    className={`flex items-center px-2 py-1 rounded ${
                      transaction.payment_status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : transaction.payment_status.toLowerCase() === "unpaid"
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {transaction.payment_status.toLowerCase() === "pending" && (
                      <FaClock />
                    )}
                    {transaction.payment_status.toLowerCase() === "unpaid" && (
                      <IoMdCloseCircle />
                    )}
                    {transaction.payment_status.toLowerCase() === "paid" && (
                      <FaCheckCircle />
                    )}
                    <span className="ml-1">{transaction.payment_status}</span>
                  </span>
                </div>

                {/* Date and Time */}
                <div className="justify-items-center text-sm text-gray-500 mb-4">
                  <span>{formatDate(transaction.createdAt)}</span>
                </div>

                <hr className="my-4" />

                {/* Items Grid */}
                <div className="grid grid-cols-3 gap-2 font-semibold text-center border-b pb-2">
                  <span>Items</span>
                  <span>Qty</span>
                  <span>Price</span>
                </div>
                {transaction.orders.map((order) => (
                  <div
                    key={order.product.id}
                    className="grid grid-cols-3 text-center mt-2"
                  >
                    <span>{order.product.name}</span>
                    <span>{order.qty}</span>
                    <span>{formatCurrency(order.product.price)}</span>
                  </div>
                ))}
                <hr className="my-4" />

                {/* Total */}
                <div className="flex justify-between mt-4 font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(transaction.total_price_transaction)}
                  </span>
                </div>
              </div>

              {/* Button */}
              <Button
                className="mt-4 bg-[#543310] text-white w-full py-2 rounded"
                onClick={() => showModal(transaction)}
              >
                {transaction.payment_status === "paid" ? "Info" : "Pay Now"}
              </Button>
            </div>
          ))
        ) : (
          // Kondisi jika tidak ada data transaksi
          <div className="col-span-full flex justify-center items-center h-40">
            <div className="text-center">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
                alt="No Data"
                className="mx-auto w-24 h-24 mb-4"
              />
              <p className="text-gray-500">No transactions found</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
      <Modal
        title={
          selectedTransaction?.payment_status === "paid"
            ? "Detail Struk Cash"
            : "Detail Payment"
        }
        open={isModalVisible}
        onCancel={handleClose}
        footer={
          <div className="flex justify-center gap-4 w-full">
            {selectedTransaction?.payment_status !== "paid" && (
              <Button
                className={`${
                  selectedTransaction?.payment_status === "unpaid"
                    ? "bg-[#543310] text-white"
                    : "bg-white text-black"
                } w-1/2 py-2 border-2 hover:bg-[#543310] hover:text-white`}
                onClick={handleCancel}
              >
                Close
              </Button>
            )}
            {selectedTransaction?.payment_status === "paid" ? (
              <Button
                className="bg-[#543310] text-white w-full py-2 hover:bg-white hover:text-black border-2 border-[#543310]"
                onClick={handleClose}
              >
                Done
              </Button>
            ) : (
              <Button
                loading={isSubmitting}
                disabled={paymentMethod === "cash" && (!cash || cash <= 0)}
                className={`bg-[#543310] text-white w-1/2 py-2 border-2 border-[#543310] ${
                  (!cash || cash <= 0) && paymentMethod === "cash"
                    ? "cursor-not-allowed"
                    : "hover:bg-white hover:text-black"
                }`}
                onClick={handleSubmitPayment}
              >
                Submit Payment
              </Button>
            )}
          </div>
        }
      >
        {selectedTransaction && (
          <div>
            {/* Transaksi yang Dipilih */}
            <div className="bg-white p-4 shadow rounded flex flex-col justify-between relative">
              <div>
                {/* No Order */}
                <div className="absolute top-2 left-2 bg-[#543310] text-white font-bold text-sm w-10 h-10 flex items-center justify-center rounded-md">
                  {selectedTransaction.no_order}
                </div>

                {/* Order Name and Status */}
                <div className="flex justify-between items-center ml-12 mb-2">
                  <h3 className="text-lg font-semibold">
                    {selectedTransaction.name_order}
                  </h3>
                  <span
                    className={`flex items-center px-2 py-1 rounded ${
                      selectedTransaction.payment_status.toLowerCase() ===
                      "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : selectedTransaction.payment_status.toLowerCase() ===
                          "unpaid"
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {selectedTransaction.payment_status.toLowerCase() ===
                      "pending" && <FaClock />}
                    {selectedTransaction.payment_status.toLowerCase() ===
                      "unpaid" && <IoMdCloseCircle />}
                    {selectedTransaction.payment_status.toLowerCase() ===
                      "paid" && <FaCheckCircle />}
                    <span className="ml-1">
                      {selectedTransaction.payment_status}
                    </span>
                  </span>
                </div>

                {/* Date and Time */}
                <div className="justify-items-center text-sm text-gray-500 mb-4">
                  <span>{formatDate(selectedTransaction.createdAt)}</span>
                </div>

                <hr className="my-4" />

                {/* Items Grid */}
                <div className="grid grid-cols-3 gap-2 font-semibold text-center border-b pb-2">
                  <span>Items</span>
                  <span>Qty</span>
                  <span>Price</span>
                </div>
                {selectedTransaction.orders.map((order) => (
                  <div
                    key={order.product.id}
                    className="grid grid-cols-3 text-center mt-2"
                  >
                    <span>{order.product.name}</span>
                    <span>{order.qty}</span>
                    <span>{formatCurrency(order.product.price)}</span>
                  </div>
                ))}
                <hr className="my-4" />

                {/* Total */}
                <div className="flex justify-between mt-4 font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      selectedTransaction.total_price_transaction
                    )}
                  </span>
                </div>

                {/* Tampilkan detail jika status adalah "paid" */}
                {selectedTransaction.payment_status === "paid" && (
                  <>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                      <span>Cash</span>
                      <span>{formatCurrency(selectedTransaction.cash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change</span>
                      <span>
                        {formatCurrency(selectedTransaction.change_money)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metode</span>
                      <span>{selectedTransaction.payment_method}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Input Payment Method */}
            {selectedTransaction.payment_status !== "paid" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Method
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dataMethods?.map((method: PaymentMethod) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.method_name)}
                      className={`flex-1 px-4 py-2 border rounded text-center ${
                        paymentMethod === method.method_name
                          ? "bg-[#543310] text-white"
                          : "bg-white text-black"
                      } hover:bg-[#543310] hover:text-white`}
                    >
                      {method.method_name ?? "Unknown Method"}
                    </button>
                  ))}
                </div>
                {paymentMethod === "cash" && (
                  <>
                    <hr className="my-4" />
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Cash
                      </label>
                      <input
                        type="number"
                        value={cash ?? ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setCash(value < 0 ? 0 : value);
                        }}
                        placeholder="Enter cash amount"
                        className="w-full px-4 py-2 border rounded"
                      />
                      <div className="mt-2">
                        <label className="block text-sm font-semibold mb-2">
                          Change
                        </label>
                        <input
                          type="text"
                          value={formatCurrency(
                            Math.max(
                              cash -
                                selectedTransaction.total_price_transaction,
                              0
                            )
                          )}
                          readOnly
                          className="w-full px-4 py-2 border rounded bg-gray-100"
                        />
                      </div>
                    </div>
                  </>
                )}
                {paymentMethod === "qris" && (
                  <div className="flex flex-col justify-center items-center mt-4">
                    <span className="mb-2">WARPI</span> {/* Teks WARPI */}
                    <Image
                      src="/img/download.svg"
                      alt="QR Code"
                      width={160}
                      height={160}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionPage;
