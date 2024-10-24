"use client";
import Image from "next/image";
import { ShoppingCartOutlined, HomeOutlined, HistoryOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-[#543310] p-4 flex justify-between items-center text-white border-8 border-[#543310]">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={50} height={50} className="mr-4" />
        <h1 className="text-2xl font-inter">warπ</h1>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => router.push("/customer/dashboard")}
          className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[6px] flex items-center"
        >
          <HomeOutlined className="mr-2" />
          Home
        </button>

        <button
          onClick={() => router.push("/customer/history")}
          className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[6px] flex items-center"
        >
          <HistoryOutlined className="mr-2" />
          History
        </button>

        <button
          onClick={() => router.push("/customer/cart")}
          className="bg-[#543310] text-white hover:bg-[#3a250e]  px-3 py-2 rounded-[6px] flex items-center"
        >
          <ShoppingCartOutlined />
        </button>
      </div>
    </nav>
  );
}
