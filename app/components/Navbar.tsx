"use client"
import Image from 'next/image';

import React from 'react';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="bg-[#543310] p-4 flex justify-between items-center text-white border-8 border-[#A67B5B]">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-inter">warπ</h1>
      </div>
      <div className="flex space-x-8">
      <button
            onClick={() => router.push("/register")} // Using router after mount
            className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
            style={{ borderRadius: "6px" }}
            
          >
             <HomeOutlined className="mr-2" /> 
            Home 
          </button>

          <button
            onClick={() => router.push("/register")} // Using router after mount
            className="bg-[#A67B5B] text-white hover:bg-[#8a5a3f] border border-[#A67B5B] px-4 py-2 rounded-[8px] flex items-center"
            style={{ borderRadius: "6px" }}
            
          >
             <HistoryOutlined className="mr-2" />
            History
          </button>
          <button>
            <ShoppingCartOutlined  
            onClick={() => router.push("/register")}
            className="mr-2 w-25 h-25" />{" "}
          </button>
          
      </div>
    </nav>
  );
}
