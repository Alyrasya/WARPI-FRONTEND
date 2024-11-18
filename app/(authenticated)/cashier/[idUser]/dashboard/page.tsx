// components/Dashboard.tsx
"use client";
import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

interface IconBoxProps {
  icon: string;
  title: string;
  value: string | number;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg shadow-md bg-white">
      <div className="w-10 h-10 bg-[#543310] flex items-center justify-center rounded mb-2">
        <div className="w-"></div>
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-medium text-[#543310]">{title}</h3>
      <p className="text-lg text-gray-500">{value}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const data = [
    {
      icon: "/heroicons_clock-16-solid.svg", // Ganti dengan path ikon Anda
      title: "Pending Transaction",
      value: 50,
    },
    {
      icon: "/unpaid.svg", // Ganti dengan path ikon Anda
      title: "Unpaid Transaction",
      value: 30,
    },
    {
      icon: "/paid.svg", // Ganti dengan path ikon Anda
      title: "Paid Transaction",
      value: 70,
    },
    {
      icon: "/income.svg", // Ganti dengan path ikon Anda
      title: "Total Income",
      value: "Rp. 1.000.000.000,00",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((item, index) => (
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
