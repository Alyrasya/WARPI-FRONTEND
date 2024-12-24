"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Card, Pagination, notification } from "antd";
import { RightOutlined, SearchOutlined } from "@ant-design/icons";
import { productRepository } from "#/repository/product";
import { categoryRepository } from "#/repository/category";
import { orderRepository } from "#/repository/order";
import { parseJwt } from "#/utils/convert";
import DetailProductModal from "./DetailProductModal";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  product_name: string;
  price: number;
  product_photo: string;
  category: { category_name: string };
  status_product: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [idUser, setIdUser] = useState<string>("");

  const imgProduct = (image: string) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"
    }/category/upload/${image}`;

  // Modal Detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProductData, setDetailProductData] = useState<any | null>();

  const { data: categoryData } = categoryRepository.hooks.useGetAllCategory({
    page: 1,
    page_size: 100,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.id) {
        setIdUser(payload.id);
      }
    } else{
      router.push("/home");
      return;
    }
  }, []);

  const categories =
    categoryData?.data
      ?.filter((category: any) => category.status_category === "active")
      ?.map((category: any) => category.category_name) || [];

  const categoryTabs = ["All", ...categories];

  const { data: listProducts } = productRepository.hooks.useGetAllProduct({
    page: page,
    page_size: pageSize,
    product_name: searchQuery,
    category_name: activeTab === "All" ? "" : activeTab,
  });

  const productData =
    listProducts?.data
      ?.filter((product: Product) => product.status_product === "active")
      ?.map((product: Product) => ({
        key: product.id,
        product_name: product.product_name,
        price: product.price,
        product_photo: product.product_photo,
        category: product.category,
      })) || [];

  const addToCart = async (id_product: string[]) => {
    try {
      // Panggil metode addToCart dari orderRepository
      const newOrder = await orderRepository.api.addToCart(idUser, {
        id_product,
      });
      if (newOrder) {
        openSuccessNotification("Add to cart berhasil");
      }
    } catch (error) {
      openErrorNotification("Add to cart gagal!");
    }
  };

  const handleViewDetailProduct = (id: string) => {
    setIsDetailModalOpen(true);
    setDetailProductData(id);
  };

  // Success notification
  const openSuccessNotification = (message: string) => {
    notification.success({
      message: "Success",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  // Error notification
  const openErrorNotification = (message: string) => {
    notification.error({
      message: "Error",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-center items-center mb-4 space-x-16">
        <Input
          placeholder="Search menu"
          prefix={<SearchOutlined style={{ color: "#543310" }} />}
          className="rounded-full w-80"
          allowClear
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-center space-x-2 mb-6">
        {categoryTabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((product: any) => (
          <Card
            style={{ width: "100%" }}
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
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-gray-500">
                      {product.category?.category_name || "No category"}
                    </p>
                    <p className="text-[#374151]">Rp {product.price}</p>
                  </div>
                  <RightOutlined
                    onClick={() => handleViewDetailProduct(product.key)}
                    className="cursor-pointer text-[#00000] hover:text-[#374151] text-lg mt-7"
                  />
                </div>
              }
            />
            <Button
              onClick={() => addToCart([product.key])}
              className="mt-4 w-full"
              style={{ backgroundColor: "#543310", color: "white" }}
            >
              Add to cart
            </Button>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          pageSize={pageSize}
          current={page}
          total={listProducts?.totalCount || 0}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
      {detailProductData && (
        <DetailProductModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          id={detailProductData}
        />
      )}
    </div>
  );
}
