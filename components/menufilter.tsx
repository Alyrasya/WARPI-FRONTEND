import React, { useState } from "react";
import { Input, Button, Card, Pagination } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { productRepository } from "#/repository/product";

interface Product {
  id: number;
  product_name: string;
  price: number;
  photo_product: string;
  category_name: string;
}


const MenuFilter = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Fetch products from API
  const { data: listProducts } = productRepository.hooks.useGetAllProduct({
    page: page,
    page_size: pageSize,
    product_name: searchQuery,
    category_name: activeTab === "all" ? undefined : activeTab,
  });

  // Map API data into structured product data
  const products = listProducts?.data?.map((product: Product, index: number) => ({
    key: product.id,
    name: product.product_name,
    price: product.price,
    image: product.photo_product,
    category: product.category_name,
  })) || [];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPage(1); // Reset to first page when changing tabs
  };

  const onSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search and Filter */}
      <div className="flex justify-center items-center mb-4 space-x-16">
        {/* Search Input */}
        <Input
          placeholder="Search menu"
          prefix={<SearchOutlined style={{ color: "#543310" }} />}
          className="rounded-full w-80"
          allowClear
          onChange={(e) => onSearch(e.target.value)}
        />

        {/* Filter Button */}
        {/* <Button
          className="bg-[#543310] text-white rounded-full px-4 py-2 flex items-center"
          icon={<FilterOutlined />}
        >
          Filter
        </Button> */}
      </div>

      {/* Tabs for All, Food, Drinks */}
      <div className="flex justify-center space-x-2 mb-6">
        {["all", "food", "drinks"].map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`cursor-pointer flex items-center justify-center border-2 rounded-md transition-all duration-300
            ${
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
        {products.map((product:any, index:any) => (
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
              description={
                <div>
                  <p>{product.price}</p> {/* Price */}
                  <p className="text-gray-500">{product.sold}</p> {/* Sold */}
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
          total={listProducts?.total || 0} // Total from API response
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default MenuFilter;
