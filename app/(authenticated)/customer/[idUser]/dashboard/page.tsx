"use client";

import React, { useState } from "react";
import { Input, Button, Card, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { productRepository } from "#/repository/product";
import { categoryRepository } from "#/repository/category";

interface Product {
  id: number;
  product_name: string;
  price: number;
  product_photo: string;
  category: string;
  status_product: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // Function to construct image URL
  const imgProduct = (image: string) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"
    }/category/upload/${image}`;

  // Fetch categories from API
  const { data: categoryData } = categoryRepository.hooks.useGetAllCategory({
    page: 1,
    page_size: 100, // Ambil semua kategori
  });

  // Ambil nama kategori dengan status aktif
  const categories =
    categoryData?.data
      ?.filter((category: any) => category.status_category === "active") // Filter kategori aktif
      ?.map((category: any) => category.category_name) || [];
  const categoryTabs = ["all", ...categories];

  // Fetch products from API
  const { data: listProducts } = productRepository.hooks.useGetAllProduct({
    page: page,
    page_size: pageSize,
    product_name: searchQuery,
    category_name: activeTab === "all" ? "" : activeTab, // Set category_name menjadi "" saat activeTab "all"
  });

  // Filter produk berdasarkan status_product "active"
  const products =
    listProducts?.data
      ?.filter((product: Product) => product.status_product === "active")
      ?.map((product: Product) => ({
        key: product.id,
        product_name: product.product_name,
        price: product.price,
        product_photo: product.product_photo,
        category: product.category,
      })) || [];

  const totalProducts = products.length; // Total produk hanya yang aktif

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPage(1); // Reset page ke 1 saat kategori berubah
  };

  const onSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset page ke 1 saat pencarian berubah
  };

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search and Filter */}
      <div className="flex justify-center items-center mb-4 space-x-16">
        <Input
          placeholder="Search menu"
          prefix={<SearchOutlined style={{ color: "#543310" }} />}
          className="rounded-full w-80"
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Tabs for All Categories */}
      <div className="flex justify-center space-x-2 mb-6">
        {categoryTabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`cursor-pointer flex items-center justify-center border-2 rounded-md transition-all duration-300 ${
              activeTab === tab
                ? "border-[#543310] bg-[#543310] text-white"
                : "border-transparent text-[#543310]"
            }`}
            style={{ width: "198px", height: "36px", marginBottom: "10px" }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Card
            key={product.key}
            hoverable
            cover={
              <img
                alt={product.product_name}
                src={imgProduct(product.product_photo)}
                className="h-48 object-cover"
              />
            }
            className="shadow-md"
          >
            <Card.Meta
              title={product.product_name}
              description={
                <div>
                  <p className="text-gray-500">{product.category.category_name}</p>
                  <p className="text-#374151">Rp {product.price}</p>
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
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalProducts}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}
