"use client";
import React, { useState } from "react";
import CartItem from "#/app/components/CardItems";
import Navbar from "#/app/components/Navbar";
import { useRouter } from "next/navigation"; // Ganti dari next/router ke next/navigation

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sold: string;
  imageUrl: string;
};

const dummyItems: CartItemType[] = [
  {
    id: 1,
    name: "Coffe",
    price: 139900,
    quantity: 1,
    sold: "4rb+",
    imageUrl: "/kopi.svg",
  },
  {
    id: 2,
    name: "Coffe",
    price: 139900,
    quantity: 1,
    sold: "4rb+",
    imageUrl: "/coffee.jpg",
  },
  {
    id: 3,
    name: "Coffe",
    price: 139900,
    quantity: 1,
    sold: "4rb+",
    imageUrl: "/coffee.jpg",
  },
  {
    id: 4,
    name: "Coffe",
    price: 139900,
    quantity: 1,
    sold: "4rb+",
    imageUrl: "/coffee.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(dummyItems);
  const [orderName, setOrderName] = useState(""); // Untuk menyimpan input order name
  const router = useRouter(); // gunakan useRouter dari next/navigation

  const handleQuantityChange = (
    id: number,
    type: "increment" | "decrement"
  ) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity =
          type === "increment"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <div className="relative flex justify-center items-center mb-4 text-gray-700">
        {/* Back button di pinggir kiri */}
        <button
          onClick={() => router.push("/customer/dashboard")}
          className="absolute left-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Title "my cart" di tengah */}
        <h1 className="text-xl font-semibold text-gray-800">my cart</h1>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          order name
        </label>
        <input
          type="text"
          placeholder="masukan nama anda"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)} // Handle perubahan input
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <p className="text-xl font-semibold">
          Rp {totalPrice.toLocaleString()}
        </p>
      </div>

      <button className="w-full bg-brown-600 text-white py-3 mt-6 rounded-lg">
        Payment
      </button>
    </div>
  );
}
