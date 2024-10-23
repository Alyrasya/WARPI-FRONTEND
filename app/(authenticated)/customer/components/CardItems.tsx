// components/CartItem.tsx
"use client"
import React from 'react';
import Navbar from './Navbar';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    sold: string;
    imageUrl: string;
  };
  onQuantityChange: (id: number, type: 'increment' | 'decrement') => void;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-4 shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-500">Rp {item.price.toLocaleString()}</p>
          <p className="text-gray-400">{item.sold} sold</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onQuantityChange(item.id, 'decrement')} className="bg-gray-200 px-3 py-1 rounded-md">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 'increment')} className="bg-gray-200 px-3 py-1 rounded-md">+</button>
        <button onClick={() => onRemove(item.id)} className="bg-red-400 text-white px-2 py-1 rounded-md">🗑️</button>
      </div>
    </div>
  );
};

export default CartItem;
