"use client";
import { Row, Col, Card, Statistic } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';

export default function historyPage() {
  return (
    <>
    <div style={{ padding: '16px' }}>
        <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-center italic text-gray-800">
            histori pemesanan
          </h1>
          <p className="text-center text-gray-600 mb-8">
            lihat pemesanan yang di lakukan
          </p>

          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md mb-4 relative flex items-center"
            >
              {/* Badge Selesai di Kanan Atas */}
              <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full">
                selesai
              </span>

              {/* Konten Kiri: Icon dan Informasi */}
              <div className="flex items-center flex-grow">
                <div className="bg-gray-200 p-4 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-600">💰</span>
                </div>
                <div className="ml-4 flex-grow">
                  <h2 className="font-bold text-xl text-gray-900">Ariel Hikmat</h2>
                  {/* Konten Kanan: Tanggal dan Tombol Back */}
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 mb-4">23-2-2024</p>
                    <a href='' className="text-gray-400 text-xl">
                    &gt;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}