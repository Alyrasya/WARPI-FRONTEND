"use client";

import React from "react";
import { useParams } from "next/navigation"; // Gunakan useParams untuk mendapatkan parameter
import useSWR from "swr";
import { http } from "#/utils/http"; // Pastikan fetcher sudah benar

interface IconBoxProps {
  icon: string;
  title: string;
  value: string | number;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg shadow-md">
      <div className="w-10 h-10 bg-[#543310] flex items-center justify-center rounded mb-2">
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-medium text-[#543310]">{title}</h3>
      <p className="text-lg text-gray-500">{value}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const params = useParams();
  let idUser = params?.idUser;

  // Debug parameter
  console.log("Params:", params);
  console.log("ID User:", idUser);

  if (Array.isArray(idUser)) {
    idUser = idUser[0];
  }

  if (!idUser) {
    return <div>Invalid or missing user ID.</div>;
  }

  const { data, error } = useSWR(
    `/dashboard/cashier-summary/${idUser}`,
    http.fetcher
  );

  // Debug respons API
  console.log("SWR Data:", data);
  console.log("SWR Error:", error);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    totalPaidTransaction = 0,
    totalUnpaidTransaction = 0,
    totalPendingTransaction = 0,
    totalTransactionCashier = 0,
  } = data || {};

  console.log("Total Transaction Cashier:", totalTransactionCashier);

  const summaryData = [
    {
      icon: "/heroicons_clock-16-solid.svg",
      title: "Pending Transaction",
      value: totalPendingTransaction,
    },
    {
      icon: "/unpaid.svg",
      title: "Unpaid Transaction",
      value: totalUnpaidTransaction,
    },
    {
      icon: "/paid.svg",
      title: "Paid Transaction",
      value: totalPaidTransaction,
    },
    {
      icon: "/income.svg",
      title: "Total Income",
      value: `Rp. ${(Number(totalTransactionCashier) || 0).toLocaleString()}`,
    },
  ];

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
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
