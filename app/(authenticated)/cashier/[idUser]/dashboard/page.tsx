"use client";
import React from "react";
import { dashboardRepository } from "#/repository/dashboard";

interface IconBoxProps {
  icon: string;
  title: string;
  value: string | number;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg shadow-md bg-white">
      <div className="w-10 h-10 bg-[#543310] flex items-center justify-center rounded mb-2">
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-medium text-[#543310]">{title}</h3>
      <p className="text-lg text-gray-500">{value}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  // Menggunakan hook untuk mendapatkan data dari backend
  const { data, error } = dashboardRepository.hooks.useGetCashierSummary();

  // Menangani kondisi loading dan error
  if (error) {
    return <div>Error loading data...</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Data yang diterima dari backend
  const summaryData = [
    {
      icon: "/heroicons_clock-16-solid.svg", // Ganti dengan path ikon Anda
      title: "Pending Transaction",
      value: data.totalPending || 0, // Dapatkan dari data yang diterima
    },
    {
      icon: "/unpaid.svg", // Ganti dengan path ikon Anda
      title: "Unpaid Transaction",
      value: data.totalUnpaid || 0, // Dapatkan dari data yang diterima
    },
    {
      icon: "/paid.svg", // Ganti dengan path ikon Anda
      title: "Paid Transaction",
      value: data.totalPaid || 0, // Dapatkan dari data yang diterima
    },
    {
      icon: "/income.svg", // Ganti dengan path ikon Anda
      title: "Total Income",
      value: data.totalAllIncome
        ? `Rp. ${data.totalAllIncome.toLocaleString()}`
        : "Rp. 0", // Menangani jika totalAllIncome tidak ada
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {summaryData.map((item, index) => (
        <IconBox
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default Dashboard;
