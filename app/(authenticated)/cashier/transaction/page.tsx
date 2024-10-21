"use client";

import React, { useState } from "react";
import { Button, Modal, Input, Tabs } from "antd";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

interface Item {
  name: string;
  qty: number;
  price: number;
}

interface Transaction {
  id: string;
  status: "Pending" | "Unpaid" | "Paid";
  customer: string;
  date: string;
  time: string;
  items: Item[];
}

const transactions: Transaction[] = [
  {
    id: "01",
    status: "Pending",
    customer: "Ariel Hikmat",
    date: "08 Agustus 2024",
    time: "04:12",
    items: [
      { name: "Es Teh Manis", qty: 1, price: 15000 },
      { name: "Nasi Goreng", qty: 1, price: 15000 },
      { name: "Coffe", qty: 1, price: 25000 },
    ],
  },
  {
    id: "02",
    status: "Paid",
    customer: "Indoe",
    date: "09 Agustus 2024",
    time: "02:12",
    items: [
      { name: "Es Teh Manis", qty: 1, price: 15000 },
      { name: "Nasi Goreng", qty: 1, price: 15000 },
      { name: "Coffe", qty: 1, price: 25000 },
    ],
  },
  {
    id: "03",
    status: "Unpaid",
    customer: "Masala Doni",
    date: "09 Agustus 2024",
    time: "02:12",
    items: [
      { name: "Es Teh Manis", qty: 1, price: 15000 },
      { name: "Nasi Goreng", qty: 1, price: 15000 },
      { name: "Coffe", qty: 1, price: 25000 },
    ],
  },
];

const TransactionPage = () => {
  const [filter, setFilter] = useState<"Pending" | "Unpaid" | "Paid">(
    "Pending"
  );
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [cash, setCash] = useState("");
  const [change, setChange] = useState("");

  const showModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cashValue = parseInt(e.target.value) || 0;
    const total =
      selectedTransaction?.items.reduce((sum, item) => sum + item.price, 0) ||
      0;
    setCash(e.target.value);
    setChange((cashValue >= total ? cashValue - total : 0).toLocaleString());
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.status === filter &&
      (transaction.customer.toLowerCase().includes(search.toLowerCase()) ||
        transaction.id.toString().includes(search) ||
        transaction.date.includes(search))
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const getStatusIcon = (status: "Pending" | "Unpaid" | "Paid") => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-[#CBD5E1]" />;
      case "Unpaid":
        return <IoMdCloseCircle className="text-red-500" />;
      case "Paid":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-[#F1F5F9]">
      <div className="flex justify-between items-center mb-4">
        <div>
          {["Pending", "Unpaid", "Paid"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as "Pending" | "Unpaid" | "Paid")}
              className={`px-4 py-2 mx-1 ${
                filter === status ? "bg-[#543310] text-white" : "bg-[#ffff]"
              } rounded`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search name, no, etc"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <span className="absolute right-2 top-2.5">
            <CiSearch />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                {/* Box untuk nomor pesanan */}
                <div className="bg-[#543310] text-white px-5 py-4 rounded-md text-[16px] mr-3">
                  {transaction.id}
                </div>
                {/* Nama customer */}
                <h3 className="text-lg font-bold">{transaction.customer}</h3>
              </div>
              <span className="flex items-center bg-[#eeeeee] text-xs px-2 py-1 rounded">
                {getStatusIcon(transaction.status)}
                <span className="ml-2">{transaction.status}</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 ">{transaction.date}</p>
            <p className="text-sm text-gray-500 right-3">{transaction.time}</p>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="text-left">Items</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {transaction.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{formatCurrency(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-right font-bold">
              Total:{" "}
              {formatCurrency(
                transaction.items.reduce((sum, item) => sum + item.price, 0)
              )}
            </div>
            {transaction.status === "Paid" ? (
              <Button
                onClick={() => showModal(transaction)}
                type="primary"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
              >
                Info
              </Button>
            ) : (
              <Button
                onClick={() => showModal(transaction)}
                type="primary"
                className="mt-4 w-full bg-brown hover:bg-brown-hover text-white py-2 rounded"
              >
                Pay Bills
              </Button>
            )}
          </div>
        ))}
      </div>

      <Modal
        title="Transaction Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedTransaction && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {/* Box untuk nomor pesanan */}
                <div className="bg-[#543310] text-white px-2 rounded-md  mr-3">
                  {selectedTransaction.id}
                </div>
                {/* Nama customer */}
                <span className="font-bold">
                  {selectedTransaction.customer}
                </span>
              </div>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                {selectedTransaction.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{selectedTransaction.date}</p>
            <p className="text-sm text-gray-500 ">{selectedTransaction.time}</p>
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th className="text-left">Items</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedTransaction.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{formatCurrency(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-right font-bold">
              Total:{" "}
              {formatCurrency(
                selectedTransaction.items.reduce(
                  (sum, item) => sum + item.price,
                  0
                )
              )}
            </div>

            {selectedTransaction.status === "Paid" ? (
              // Modal untuk transaksi yang sudah dibayar
              <div className="flex justify-center mt-5">
                <div className="border-b border-[#000000] my-4"></div>
                <Button
                  type="primary"
                  onClick={handleCancel}
                  className="bg-blue-500 text-white mr-2"
                >
                  Back
                </Button>
              </div>
            ) : (
              // Modal untuk transaksi yang belum dibayar
              <>
                <Tabs defaultActiveKey="1" className="mt-4">
                  <Tabs.TabPane tab="Cash" key="1">
                    <Input
                      type="number"
                      value={cash}
                      onChange={handleCashChange}
                      placeholder="Enter cash amount"
                    />
                    <Input
                      type="number"
                      value={change}
                      onChange={handleCashChange}
                      placeholder="kembalian"
                      className="mt-3"
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Qr Code" key="2">
                    <p>Payment via credit card is under development.</p>
                  </Tabs.TabPane>
                </Tabs>
                <div className="flex justify-between mt-4">
                  <Button
                    className="bg-green-500 text-black"
                    onClick={() => {
                      setSelectedTransaction(
                        (prev) => prev && { ...prev, status: "Paid" }
                      );
                      handleCancel();
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white"
                  >
                    Paid
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default TransactionPage;
