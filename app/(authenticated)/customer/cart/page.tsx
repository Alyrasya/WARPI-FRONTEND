"use client"
import React, { useEffect,useState } from 'react';
import CartItem from '../components/CardItems';
import Navbar from '../components/Navbar';

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sold: string;
  imageUrl: string;
};

const dummyItems: CartItemType[] = [
  { id: 1, name: 'Coffe', price: 139900, quantity: 1, sold: '4rb+', imageUrl: '/coffee.jpg' },
  { id: 2, name: 'Coffe', price: 139900, quantity: 1, sold: '4rb+', imageUrl: '/coffee.jpg' },
  { id: 3, name: 'Coffe', price: 139900, quantity: 1, sold: '4rb+', imageUrl: '/coffee.jpg' },
  { id: 4, name: 'Coffe', price: 139900, quantity: 1, sold: '4rb+', imageUrl: '/coffee.jpg' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(dummyItems);

  const handleQuantityChange = (id: number, type: 'increment' | 'decrement') => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = type === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar/>
      <h1 className="justify-center items-center text-3xl font-semibold mb-6">My Cart</h1>
      <input
        type="text"
        placeholder="Masukan nama anda"
        className="mb-6 w-full p-2 border rounded-md"
      />
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <p className="text-xl font-semibold">Rp {totalPrice.toLocaleString()}</p>
      </div>
      <button className="w-full bg-brown-600 text-white py-3 mt-6 rounded-lg">
        Payment
      </button>
    </div>
  );
}
