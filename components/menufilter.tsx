import React, { useState } from "react";
import { Input, Button, Card, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { GetAllProduct, productRepository } from "#/repository/product";
import { categoryRepository } from "#/repository/category";

interface Product {
  id: number;
  product_name: string;
  price: number;
  photo_product: string;
  category_name: string;
}

async function useGetAllProduct(params:GetAllProduct) {
  const res = await fetch("https://")
  
}

const MenuFilter = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // Fetch categories from API
  const { data: categoryData, isLoading: isCategoryLoading } =
    categoryRepository.hooks.useGetAllCategory({
      page: 1,
      page_size: 100, // Ambil semua kategori
    });

  // Ambil nama kategori dengan status aktif
  const categories = categoryData?.data
    ?.filter((category: any) => category.status_category === "active") // Filter kategori aktif
    ?.map((category: any) => category.category_name) || [];
  const categoryTabs = ["all", ...categories];

  // Fetch products from API
  const { data: listProducts, isLoading: isProductLoading } =
    productRepository.hooks.useGetAllProduct({
      page: page,
      page_size: pageSize,
      product_name: searchQuery,
      category_name: activeTab === "all" ? undefined : activeTab,
    });

  const products =
    listProducts?.data?.map((product: Product) => ({
      key: product.id,
      name: product.product_name,
      price: product.price,
      image: product.photo_product,
      category: product.category_name,
    })) || [];

  const totalProducts = listProducts?.totalCount || 0;

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
                alt={product.name}
                src={product.image}
                className="h-48 object-cover"
              />
            }
            className="shadow-md"
          >
            <Card.Meta
              title={product.name}
              description={<p className="text-#374151">Rp {product.price}</p>}
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
};

export default MenuFilter;
