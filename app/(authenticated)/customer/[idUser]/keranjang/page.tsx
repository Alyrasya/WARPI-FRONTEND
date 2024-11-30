"use client";
import { LeftOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function CartPage() {
  return (
    <div style={{ padding: "16px" }}>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Back Icon */}
          <LeftOutlined className="text-gray-500 text-xl cursor-pointer" />
          {/* Title */}
          <h1 className="text-center text-gray-800 font-medium text-lg flex-grow">My Cart</h1>
          {/* Spacer (for alignment) */}
          <div className="w-5"></div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
  {[1, 2, 3].map((_, index) => (
    <div
      key={index}
      className="relative bg-white p-4 rounded-lg shadow-md flex items-center"
    >
      {/* Product Image */}
      <Image
        src="/coffee.jpg" // Ganti dengan URL gambar yang sesuai
        alt="Coffee"
        width={80}
        height={80}
        className="rounded-md"
      />
      {/* Product Info */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">Coffee</h2>
        <p className="text-gray-800 font-semibold text-lg">Rp139.900</p>
      </div>

      {/* Trash Icon */}
      <button
        className="absolute top-4 right-4 text-red-500 text-xl focus:outline-none"
        title="Remove Item"
      >
        <DeleteOutlined style={{ fontSize: "24px" }} />
      </button>

      {/* Quantity Buttons */}
      <div className="mt-4 flex justify-end items-center space-x-2">
        <button className="px-3 py-1 text-gray-500 border border-gray-300 rounded">
          -
        </button>
        <span className="px-4 text-gray-800">01</span>
        <button className="px-3 py-1 text-gray-500 border border-gray-300 rounded">
          +
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Total and Payment */}
      <div className="mt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total</span>
          <span>Rp419.700</span>
        </div>
        <button className="w-full mt-4 bg-[#543310] text-white py-2 rounded-md">Payment</button>
      </div>
    </div>
  );
}
