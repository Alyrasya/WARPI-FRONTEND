"use client";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Row, Button, notification, Input } from "antd";
import { cartRepository } from "#/repository/cart";
import { orderRepository } from "#/repository/order";
import { mutate } from "swr";
import { usePathname } from "next/navigation";
import { transactionRepository } from "#/repository/transaction";
import { useRouter } from "next/navigation";

interface ProductType {
  product_name: string;
  price: string;
  stock: number;
  product_photo: string;
}

interface OrderType {
  id: string;
  total_price_order: string;
  qty: number;
  product: ProductType;
}

interface DataType {
  key: string;
  product_name: string;
  price: string;
  stock: number;
  product_photo: string;
  qty: number;
  totalPrice: string;
}

export default function CartPage() {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const router = useRouter();
  const imgProduct = (image: string) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"
    }/category/upload/${image}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/home");
      return;
    }
  });

  const { data: listCart } = cartRepository.hooks.useGetCartByUserId(id || "");

  const [cartData, setCartData] = useState<DataType[]>([]);

  useEffect(() => {
    if (listCart?.order) {
      const mappedData: DataType[] = listCart.order.map((order: OrderType) => ({
        key: order.id,
        product_name: order.product.product_name,
        price: order.product.price,
        stock: order.product.stock,
        product_photo: order.product.product_photo,
        qty: order.qty,
        totalPrice: (order.qty * parseFloat(order.product.price)).toFixed(2),
      }));
      setCartData(mappedData);
    }
  }, [listCart]);

  const handleDelete = async (id_order: string) => {
    try {
      const deleteOrder = await orderRepository.api.deleteOrder(id_order);
      if (deleteOrder) {
        openSuccessNotification("Item removed from cart successfully.");
        mutate(cartRepository.url.getCartByUserId(id || ""));
      }
    } catch (error) {
      openErrorNotification("Failed to remove item from cart.");
    }
  };

  const handleEditQty = async (
    id_order: string,
    action?: "increment" | "decrement",
    qty?: number
  ) => {
    try {
      setCartData((prevCartData) =>
        prevCartData.map((item) => {
          if (item.key === id_order) {
            let newQty = qty !== undefined ? qty : item.qty;
            if (action === "increment") newQty += 1;
            if (action === "decrement" && item.qty > 1) newQty -= 1;
            return {
              ...item,
              qty: newQty,
              totalPrice: (newQty * parseFloat(item.price)).toFixed(2), // Make sure totalPrice is a string
            };
          }
          return item;
        })
      );

      await orderRepository.api.editOrderQuantity(id_order, {
        action,
        qty,
      });

      openSuccessNotification("Quantity updated successfully.");
      mutate(cartRepository.url.getCartByUserId(id || ""));
    } catch (error) {
      openErrorNotification("Failed to update quantity.");
    }
  };

  const handleCreateTransaction = async () => {
    try {
      // Periksa apakah ada item dengan qty lebih besar dari stock
      const invalidStock = cartData.find((item) => item.qty > item.stock);
      if (invalidStock) {
        openErrorNotification(
          `Failed to create transaction. Stock tidak mencukupi untuk item: ${invalidStock.product_name}.`
        );
        return; // Batalkan proses transaksi
      }

      const transactionData = {
        orders: cartData.map((item) => ({
          id_order: item.key,
          qty: item.qty,
          total_price: parseFloat(item.totalPrice),
        })),
      };

      const createTransaction =
        await transactionRepository.api.createTransaction(
          id || "",
          transactionData
        );
      if (createTransaction) {
        openSuccessNotification("Transaction created successfully.");
        mutate(cartRepository.url.getCartByUserId(id || ""));
      }
    } catch (error) {
      openErrorNotification("Failed to create transaction.");
    }
  };

  const openSuccessNotification = (message: string) => {
    notification.success({
      message: "Success",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  const openErrorNotification = (message: string) => {
    notification.error({
      message: "Error",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <LeftOutlined
          className="text-brown-500 text-2xl cursor-pointer"
          onClick={() => (window.location.href = `/customer/${id}/dashboard`)}
        />
        <h1 className="text-center text-brown-700 font-bold text-xl flex-grow">
          My cart
        </h1>
        <div className="w-5"></div>
      </div>

      {/* Cart Content */}
      {cartData.length > 0 ? (
        <div>
          {/* Cart Items */}
          <div className="space-y-4">
            {cartData.map((cartItem) => (
              <Card
                key={cartItem.key}
                hoverable
                className="shadow-md rounded-md"
              >
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Col>
                    <img
                      alt={cartItem.product_name}
                      src={imgProduct(cartItem.product_photo)}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </Col>
                  <Col style={{ flexGrow: 1, paddingLeft: "8px" }}>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg text-gray-900">
                        {cartItem.product_name}
                      </span>
                      <span className="text-gray-500 font-semibold text-base mt-1">
                        Rp{cartItem.price}
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className="flex flex-col gap-3">
                      <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "red" }} />}
                        className="text-red-500 focus:outline-none self-end"
                        onClick={() => handleDelete(cartItem.key)}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg overflow-hidden w-[120px]">
                          <Button
                            className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-200 focus:outline-none"
                            onClick={() =>
                              handleEditQty(cartItem.key, "decrement")
                            }
                          >
                            -
                          </Button>

                          <Input
                            type="text"
                            value={cartItem.qty}
                            className="w-full h-8 text-center text-lg outline-none hover:bg-gray-200"
                            min={1}
                            onBlur={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value > cartItem.stock) {
                                openErrorNotification("Stock tidak cukup."); // Tampilkan pesan error
                                setCartData((prevCartData) =>
                                  prevCartData.map((item) =>
                                    item.key === cartItem.key
                                      ? { ...item, qty: cartItem.qty } // Reset qty ke nilai sebelumnya
                                      : item
                                  )
                                );
                              } else if (value > 0 && value !== cartItem.qty) {
                                handleEditQty(cartItem.key, undefined, value); // Update qty
                              } else if (value <= 0 || isNaN(value)) {
                                openErrorNotification("Invalid quantity.");
                                setCartData((prevCartData) =>
                                  prevCartData.map((item) =>
                                    item.key === cartItem.key
                                      ? { ...item, qty: cartItem.qty } // Reset qty ke nilai sebelumnya jika invalid
                                      : item
                                  )
                                );
                              }
                            }}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value > cartItem.stock) {
                                openErrorNotification("Stock tidak cukup."); // Tampilkan pesan error
                              } else if (value > 0 && value !== cartItem.qty) {
                                handleEditQty(cartItem.key, undefined, value); // Update qty
                              } else if (value <= 0 || isNaN(value)) {
                                openErrorNotification("Invalid quantity.");
                                setCartData((prevCartData) =>
                                  prevCartData.map((item) =>
                                    item.key === cartItem.key
                                      ? { ...item, qty: cartItem.qty } // Reset qty ke nilai sebelumnya jika invalid
                                      : item
                                  )
                                );
                              }
                            }}
                            style={{
                              appearance: "textfield",
                              margin: "0 2px",
                            }}
                          />

                          <Button
                            className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-200 focus:outline-none"
                            onClick={() =>
                              handleEditQty(cartItem.key, "increment")
                            }
                          >
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

          <div className="mt-6">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>
                Rp
                {cartData
                  .reduce(
                    (total, item) => total + parseFloat(item.totalPrice),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <Button
              className={`w-full mt-4 py-1 rounded-md ${
                cartData.some((item) => item.qty > item.stock)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#543310] text-white"
              }`}
              onClick={handleCreateTransaction}
              disabled={cartData.some((item) => item.qty > item.stock)} // Disable jika ada stok tidak cukup
            >
              Payment
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Empty description="Your cart is empty" />
        </div>
      )}
    </div>
  );
}
