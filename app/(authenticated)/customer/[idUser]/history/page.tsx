"use client";
import { Button } from "antd";
import { transactionRepository } from "#/repository/transaction";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import ModalDetailHistory from "./DetailTransactionModal";
import { useRouter } from "next/navigation";

export default function historyPage() {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const router = useRouter();

  // Modal Detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailTransactionData, setDetailTransactionData] = useState<any | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/home");
      return;
    }
  });

  const { data: keranjangData } =
    transactionRepository.hooks.useGetAllTransactionUser(id || "");

  const handleViewDetailTransaction = (id: string) => {
    setDetailTransactionData(id);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div style={{ padding: "16px" }}>
        <div className="min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold text-center italic text-gray-800">
              History order
            </h1>
            <p className="text-center text-gray-600 mb-8">
              see orders made
            </p>

            {keranjangData?.map((index: any) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4 relative flex items-center"
              >
                {/* Badge Selesai di Kanan Atas */}
                <span
                  className={`absolute top-4 right-4 text-sm px-2 py-1 rounded-full ${
                    index.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : index.payment_status === "unpaid"
                      ? "bg-red-100 text-red-700"
                      : index.payment_status === "success"
                      ? "bg-blue-100 text-blue-700"
                      : index.payment_status === "pending"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index.payment_status === "paid"
                    ? "Paid"
                    : index.payment_status === "unpaid"
                    ? "Unpaid"
                    : index.payment_status === "success"
                    ? "Success"
                    : index.payment_status === "pending"
                    ? "Pending"
                    : "Unknown"}
                </span>

                {/* Konten Kiri: Icon dan Informasi */}
                <div className="flex items-center flex-grow">
                  {/* Lingkaran Sempurna */}
                  <div className="bg-gray-200 h-12 w-30 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-gray-600">💰</span>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="font-bold text-xl text-gray-900">
                      {index.name_order}
                    </h2>
                    {/* Konten Kanan: Tanggal dan Tombol Back */}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 mb-4">
                        {format(
                          new Date(index.createdAt),
                          "dd MMM yyyy, HH:mm"
                        )}{" "}
                        {/* Format tanggal */}
                      </p>

                      <Button
                        className="text-gray-400 text-xl"
                        onClick={() => {
                          handleViewDetailTransaction(index.id); 
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {detailTransactionData && (
        <ModalDetailHistory
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          id={detailTransactionData}
        />
      )}
    </>
  );
}
