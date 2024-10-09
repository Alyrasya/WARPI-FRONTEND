"use client";
import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is your component for displaying products

interface Product {
  id: number;
  name: string;
  price: string;
  sold: number;
  image: string;
  category: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Coffee', price: '$2.50', sold: 150, image: '/coffee.jpg', category: 'Drinks' },
  { id: 2, name: 'Tea', price: '$2.00', sold: 100, image: '/tea.jpg', category: 'Drinks' },
  { id: 3, name: 'Sandwich', price: '$5.00', sold: 80, image: '/sandwich.jpg', category: 'Food' },
  { id: 4, name: 'Cake', price: '$3.50', sold: 200, image: '/cake.jpg', category: 'Food' },
  // Add more products as needed
];

const FilterableProductList = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  // Function to filter products by category based on search input
  const getFilteredProducts = () => {
    return initialProducts.filter(product =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Search Input */}
      <div className="flex items-center justify-center">
        <input
          className="border rounded-md p-2 w-80"
          placeholder="Search by Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term when user types
        />
        <button className="ml-2 p-2 bg-[#543310] text-white rounded-md flex items-center">
          <FilterOutlined className="mr-2" /> {/* Filter icon */}
          Filter
        </button>
      </div>

      {/* Display Filtered Product List */}
      <div className="grid grid-cols-4 gap-6 mt-8">
        {getFilteredProducts().map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FilterableProductList;
