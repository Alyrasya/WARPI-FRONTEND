/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    sold: string;
    imageUrl: string;
  };
  onQuantityChange: (id: number, type: "increment" | "decrement") => void;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="relative bg-white p-4 mb-4 shadow-md rounded-lg flex justify-between items-center">
      {/* Tombol hapus di pojok kanan atas menggunakan Ant Design */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 text-red-500"
      >
        <DeleteOutlined className="text-xl" />
      </button>

      <div className="flex items-center space-x-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 rounded-md object-cover"
        />
        <div className="flex flex-col space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <p className="text-gray-600 font-semibold">
            Rp {item.price.toLocaleString()}
          </p>
          <p className="text-gray-400 text-sm">{item.sold} sold</p>
        </div>
      </div>

      {/* Tombol tambah/kurang di kanan */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onQuantityChange(item.id, "decrement")}
          className="border border-gray-300 px-3 py-1 rounded-md text-gray-700"
        >
          -
        </button>
        <span className="text-gray-700 font-medium">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, "increment")}
          className="border border-gray-300 px-3 py-1 rounded-md text-gray-700"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
