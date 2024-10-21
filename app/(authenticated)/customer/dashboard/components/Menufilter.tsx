"use client";
import React from 'react';
import { Input, Button, Tabs, Card, Pagination } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";


const { Search } = Input;
const { TabPane } = Tabs;

const MenuFilter = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Definisikan produk dengan kategori
  const products = [
    {
      name: "satay",
      price: "Rp39.900",
      sold: "40+ sold",
      image: "/fotokopi.svg",
      category: "food",
    },
    {
      name: "Latte",
      price: "Rp49.900",
      sold: "30+ sold",
      image: "/fotokopi.svg",
      category: "drink",
    },
    {
      name: "Tea",
      price: "Rp29.900",
      sold: "20+ sold",
      image: "/fotokopi.svg",
      category: "drinks",
    },
    {
      name: "Juice",
      price: "Rp39.900",
      sold: "50+ sold",
      image: "/fotokopi.svg",
      category: "drinks",
    },
    // Tambahkan produk lainnya sesuai kebutuhan
  ];

  // Filter produk berdasarkan kategori
  const filteredProducts = products.filter((product) =>
    activeTab === "all" ? true : product.category === activeTab
  );

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search and Filter */}
      <div className="flex justify-center items-center mb-4 space-x-16">
        {/* Search Input */}
        <div className="flex justify-center items-center ">
        <Input
          placeholder="Search menu"
          prefix={<SearchOutlined style={{ color: "#543310" }} />}
          className="rounded-full w-80" // Adjust the width of the search input to make it longer
          allowClear
        />
        </div>

        {/* Filter Button */}
        <Button
          className="bg-[#543310] text-white rounded-full px-4 py-2 flex items-center"
          icon={<FilterOutlined />}
        >
          Filter
        </Button>
      </div>

      {/* Tabs for All, Food, Drinks */}
      <div className="flex justify-center space-x-2 mb-6">
        {['all', 'food', 'drinks'].map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`cursor-pointer flex items-center justify-center border-2 rounded-md transition-all duration-300
            ${activeTab === tab ? 'border-[#543310] bg-[#543310] text-white' : 'border-transparent text-[#543310]'}`}
            style={{ width: '198px', height: '36px', marginBottom: '10px' }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredProducts.map((product, index) => (
    <Card
      key={index}
      hoverable
      cover={
        <img
          alt={product.name}
          src={product.image}
          className="h-48 object-cover"
        />
      }
      className="shadow-md"
    >
      <Card.Meta
        title={product.name}
        description={
          <div>
            <p>{product.price}</p> {/* Price */}
            <p className="text-gray-500">{product.sold} sold</p> {/* Sold */}
          </div>
        }
      />
      <Button
        className="mt-4 w-full"
        style={{ backgroundColor: "#543310", color: "white" }}
      >
        Add to cart
      </Button>
    </Card>
  ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center mt-6 ">
        <Pagination defaultCurrent={1} total={10} pageSize={9} />
      </div>
    </div>
  );
};

export default MenuFilter;