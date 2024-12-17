import React, { useEffect, useState } from "react";
import { Modal, Table, Typography, Button, Row, Col, Badge, Divider, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { transactionRepository } from "#/repository/transaction";
import { ColumnsType } from "antd/es/table";

const { Text } = Typography;

interface OrderType {
  id: string;
  qty: number;
  total_price_order: number;
  product: {
    product_name: string;
    price: number;
  };
}

interface TransactionDetail {
  id: string;
  no_order: number;
  name_order: string;
  total_price_transaction: number;
  cash: number;
  change_money: number;
  payment_status: string;
  createdAt: string;
  paymentMethod: {
    method_name: string;
  };
  order: OrderType[];
}

interface DetailTransactionModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}

const ModalDetailTransaction: React.FC<DetailTransactionModalProps> = ({
  isOpen,
  id,
  onClose,
}) => {
  const [transactionDetail, setTransactionDetail] =
    useState<TransactionDetail | null>(null);
  
  const { data: transaction } = transactionRepository.hooks.useGetByIdTransaction(id);

  useEffect(() => {
    if (transaction) {
      setTransactionDetail(transaction);
    }
  }, [transaction]);

  const columns: ColumnsType<OrderType> = [
    {
      title: <Text strong style={{ fontSize: "14px", textAlign: "center" }}>Items</Text>,
      dataIndex: ["product", "product_name"],
      key: "product_name",
      align: "left",
      render: (value) => <Text style={{ fontSize: "12px", textAlign: "center" }}>{value}</Text>,
    },
    {
      title: <Text strong style={{ fontSize: "14px", textAlign: "center" }}>Qty</Text>,
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (value) => <Text style={{ fontSize: "12px", textAlign: "center" }}>{value}</Text>,
    },
    {
      title: <Text strong style={{ fontSize: "14px", textAlign: "center" }}>Price</Text>,
      dataIndex: ["product", "price"],
      key: "price",
      align: "right",
      render: (value: number) => (
        <Text style={{ fontSize: "12px", textAlign: "center" }}>{value.toLocaleString()}</Text>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
      width={500}
      centered
      style={{
        borderRadius: "12px",
        padding: 0,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {transactionDetail ? (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          {/* Header */}
          <Row justify="space-between" align="middle" style={{ padding: "16px 10px 8px" }}>
            <Col>
              <Badge
                count={transactionDetail.no_order.toString().padStart(2, "0")}
                style={{
                  backgroundColor: "#543310",
                  color: "#fff",
                  fontSize: 16,
                  width: 50,
                  height: 40,
                  lineHeight: "39px",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              />
              <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: 500}}>
                {transactionDetail.name_order}
              </Text>
            </Col>
            <Col>
              <Space style={{ textAlign: "center" }}>
                <span
                  className="bg-green-100 text-green-500 px-2 py-1 rounded"
                  style={{ fontWeight: "bold" }}
                >
                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 16, marginRight: 5, textAlign: "center" }} />
                  Paid
                </span>
              </Space>
            </Col>
          </Row>

          {/* Date and Time */}
          <Row justify="space-between" style={{ padding: "0 16px 8px" }}>
            <Col>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {new Date(transactionDetail.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </Col>
            <Col>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {new Date(transactionDetail.createdAt).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Col>
          </Row>
          <Divider style={{ margin: "8px 0" }} />

          {/* Order Details */}
          <Table
            columns={columns}
            dataSource={transactionDetail.order.map((order: any) => ({
              key: order.id,
              ...order,
            }))}
            pagination={false}
            bordered={false}
            size="middle"
            style={{
              padding: "0 6px",
              margin: 0,
              borderCollapse: "collapse",
              textAlign: "center"
            }}
            className="custom-table"
          />
          <Divider style={{ margin: "8px 0" }} />

          {/* Payment Summary */}
          <Space direction="vertical" style={{ width: "100%", padding: "0 16px" }}>
            {[
              ["Total", transactionDetail.total_price_transaction],
              ["Uang Tunai", transactionDetail.cash],
              ["Kembalian", transactionDetail.change_money],
              ["Metode", transactionDetail.paymentMethod.method_name],
            ].map(([label, value]) => (
              <Row justify="space-between" key={label}>
                <Col>
                  <Text style={{ fontSize: 14 }}>{label}</Text>
                </Col>
                <Col>
                  <Text strong style={{ fontSize: 14 }}>
                    {typeof value === "number"
                      ? `Rp ${value.toLocaleString()}`
                      : value}
                  </Text>
                </Col>
              </Row>
            ))}
          </Space>

          {/* Cancel Button */}
          <Button
            onClick={onClose}
            block
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: 16,
              height: 40,
              borderRadius: "8px",
              fontSize: 14,
            }}
          >
            Cancel
          </Button>
        </Space>
      ) : (
        <Text>Loading...</Text>
      )}
    </Modal>
  );
};

export default ModalDetailTransaction;
