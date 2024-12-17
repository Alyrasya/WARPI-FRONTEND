"use client";
import { Row, Col, Card, Statistic, Modal, Button } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { transactionRepository } from "#/repository/transaction";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { parseJwt } from "#/utils/convert";
import DetailTransactionModal from "#/app/(authenticated)/admin/[idUser]/management/report/DetailTransactionModal";

export default function historyPage() {
  const pathname = usePathname();
  const [idUser, setIdUser] = useState<string>("");

  // Ambil ID User dari Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.id) {
        console.log("User ID:", payload.id);
        setIdUser(payload.id);
      }
    }
  }, []);

  const {
    data: keranjangData,
    isValidating: isLoading,
    error,
    mutate,
  } = transactionRepository.hooks.getAllTransaction(idUser);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailTransactionData, setDetailTransactionData] = useState<any | null>();

  const handleViewDetailTransaction = (id: string) => {
    setDetailTransactionData(id);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div style={{ padding: "16px" }}>
        <div className="bg-gray-100 min-h-screen p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-semibold text-center italic text-gray-800">
              histori pemesanan
            </h1>
            <p className="text-center text-gray-600 mb-8">
              lihat pemesanan yang di lakukan
            </p>

            {keranjangData?.map((index: any) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md mb-4 relative flex items-center"
              >
                {/* Badge Selesai di Kanan Atas */}
                <span
                  className={`absolute top-4 right-4 text-sm px-4 py-2 rounded-full ${
                    index.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : index.payment_status === "unpaid"
                      ? "bg-red-100 text-red-700"
                      : index.payment_status === "success"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {index.payment_status === "paid"
                    ? "Paid"
                    : index.payment_status === "unpaid"
                    ? "Unpaid"
                    : index.payment_status === "success"
                    ? "Success"
                    : "pending"}
                </span>

                {/* Konten Kiri: Icon dan Informasi */}
                <div className="flex items-center flex-grow">
                  <div className="bg-gray-200 p-4 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-gray-600">💰</span>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="font-bold text-xl text-gray-900">
                      {index.name_order}
                    </h2>
                    {/* Konten Kanan: Tanggal dan Tombol Back */}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 mb-4">{index.createdAt}</p>

                      <Button className="text-gray-400 text-xl"
                      onClick={() => handleViewDetailTransaction(index.id)}>
                        
                        &gt;
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
        <DetailTransactionModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          id={detailTransactionData}
        />
      )}
    </>
  );
}
