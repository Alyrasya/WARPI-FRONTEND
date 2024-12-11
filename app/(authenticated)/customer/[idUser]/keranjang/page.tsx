"use client"
import React, { useEffect, useState } from "react";
import { orderRepository } from "#/repository/order";
import { parseJwt } from "#/utils/convert";
import { LeftOutlined } from "@ant-design/icons";
import { Card, Spin, Empty } from "antd";
import { usePathname } from "next/navigation"; 
import useSWR from "swr";

export default function CartPage() {
  const pathname = usePathname(); 
  const [idUser, setIdUser] = useState<string>("");

  // Ambil ID User dari Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.id) {
        console.log("User ID:", payload.id); 
        setIdUser(payload.id);
      }
    }
  }, []);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const AddToCart = async (id_product: string[], product: any) => {
    try {
      const response = await orderRepository.api.addToCart(idUser, { id_product });
      if (response?.status === 200) {
        setCartProducts((prev) => [...prev, product]);
      }
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  // Fetch Data
  const fetcher = async (url: string) => {
    if (!idUser) return { data: [] };
    try {
      const response = await orderRepository.api.getCart(idUser);
      return response?.body || { data: [] };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { data: [] };
    }
  };

  const { data: products, error, isLoading } = useSWR(
    idUser ? `/cart/${idUser}` : null,
    fetcher
  );

  console.log("Produk:", products); 

  const imgProduct = (image: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"}/category/upload/${image}`;

  return (
    <div style={{ padding: "16px" }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <LeftOutlined
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() => (window.location.href = `/customer/${idUser}/dashboard`)} 
          />
          <h1 className="text-center text-gray-800 font-medium text-lg flex-grow">
            My Cart
          </h1>
          <div className="w-5"></div>
        </div>
      </div>
      
      {isLoading && <Spin size="large" className="my-10 mx-auto" />}
      {error && <p className="text-red-500">Error loading cart data.</p>}

      {Array.isArray(products?.data) && products?.data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.data.map((product: any) => (
              <Card
                key={product.id}
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
                      <p className="text-gray-800">Rp {product.price}</p>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>
                Rp{" "}
                {products?.data?.reduce(
                  (sum: number, item: any) => sum + item.price,
                  0
                )}
              </span>
            </div>
            <button className="w-full mt-4 bg-[#543310] text-white py-2 rounded-md">
              Payment
            </button>
          </div>
        </>
      ) : (
        !isLoading && (
          <div className="flex justify-center items-center h-64">
            <Empty description="Your cart is empty" />
          </div>
        )
      )}
    </div>
  );
}
