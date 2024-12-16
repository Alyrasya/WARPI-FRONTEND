"use client";
import React, { useEffect, useState } from "react";
import { orderRepository } from "#/repository/order";
import { parseJwt } from "#/utils/convert";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Card,
  Spin,
  Empty,
  InputNumber,
  Button,
  Row,
  Col,
  message,
} from "antd";
import { usePathname } from "next/navigation";
import useSWR, { mutate } from "swr";
import { cartRepository } from "#/repository/cart";
import { action } from "mobx";
import { transactionRepository } from "#/repository/transaction";

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
  console.log("idUser", idUser);
  const {
    data: keranjangData,
    isValidating: isLoading,
    error,
    mutate
  } = cartRepository.hooks.getCart(idUser);
  // console.log(keranjangData?.order)
  const imgProduct = (image: string) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"
    }/category/upload/${image}`;
  {
    keranjangData?.order.map((order: any) => console.log(order?.id));
  }
  const deleteOrder = async (id_order: any) => {
    if (!id_order) {
      message.error("Order ID is invalid.");
      return;
    }

    try {
      console.log("Sending delete request for order ID:", id_order);
      const response = await orderRepository.api.deleteOrder(id_order);

      if (response) {
        message.success("Order deleted successfully!");
      } else {
        message.error("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("An error occurred while deleting the order.");
    }
  };
  const editQuantity = async(id_order : any, action :string)=>{
    try {
      const response = await orderRepository.api.editOrderQuantity(id_order,{action : action});
      mutate();
      return response;
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("An error occurred while deleting the order.");
    }
    
  }
  const createTransaction = async (id_user:any )=>{
    try {
      const response = await transactionRepository.api.createTransaction(id_user);
      mutate();
      return response;
    } catch (error) {
      console.error("Error creating transaction:", error);
      
    }
  }
  const totalPrice = keranjangData?.order.reduce((sum:any, order:any) => {
    return sum + parseFloat(order?.total_price_order);
  }, 0);
  return (
    <div style={{ padding: "16px" }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <LeftOutlined
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() =>
              (window.location.href = `/customer/${idUser}/dashboard`)
            }
          />
          <h1 className="text-center text-gray-800 font-medium text-lg flex-grow">
            My Cart
          </h1>
          <div className="w-5"></div>
        </div>
      </div>

      {isLoading && <Spin size="large" className="my-10 mx-auto" />}
      {error && <p className="text-red-500">Error loading cart data.</p>}

      {keranjangData?.order.length > 0 ? (
        <>
          {/* <div className="flex flex-col">
            <label htmlFor="orderName" className="text-gray-500 text-sm mb-1">
              order name
            </label>
            <input
              type="text" 
              id="orderName"
              name="orderName"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter order name"
            />
          </div> */}
          <div className="space-y-4">
            {keranjangData?.order.map((order: any) => (
              <Card key={order?.id} hoverable className="shadow-md rounded-md">
                {" "}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px", // Mengatur jarak antar kolom
                  }}
                >
                  <Col>
                    <img
                      alt={order?.product?.product_name}
                      src={imgProduct(order?.product?.product_photo)}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </Col>
                  <Col style={{ flexGrow: 1, paddingLeft: "8px" }}>
                    {" "}
                    {/* Menempelkan ke kolom pertama */}
                    <p className="font-semibold text-lg">
                      {order?.product?.product_name}
                    </p>
                    <p className="text-gray-800 font-semibold text-lg">
                      Rp{order?.product?.price}
                    </p>
                  </Col>
                  <Col>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                        className="text-red-500 text-xl focus:outline-none self-end"
                        onClick={() => {
                          deleteOrder(order.id);
                          console.log(order.id);
                        }}
                      />
                      {/* Input Number di bawah */}
                      <div className="flex items-center justify-between">
                        <div className="mt-4 flex justify-end items-center space-x-2"></div>
                        <div className="flex items-center border rounded-lg overflow-hidden w-[100px]">
                          <Button 
                          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-200 focus:outline-none"
                          onClick={()=> editQuantity(order.id,'decrement')}>
                            -
                          </Button>

                          {/* Input Field */}
                          <InputNumber
                            type="number"
                            defaultValue={order.qty}
                            className="w-45 text-center text-lg font-semibold outline-none"
                            min={1}
                            style={{ appearance: "textfield" }} // Menghapus spinner default
                          />

                          <Button 
                          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-200 focus:outline-none"
                          onClick={()=> editQuantity(order.id,'increment')}>
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>
                Rp{totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
            onClick={()=> createTransaction(idUser)}
             className="w-full mt-4 bg-[#543310] text-white py-2 rounded-md" >
              Payment
            </Button>
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
