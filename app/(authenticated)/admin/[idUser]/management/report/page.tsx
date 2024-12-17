"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  notification,
  Pagination,
  DatePicker,
  Menu,
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Dayjs } from "dayjs";
import { transactionRepository } from "#/repository/transaction";
import DetailTransactionModal from "./DetailTransactionModal";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  no_order: string;
  name_order: string;
  payment_method: string;
  total_price_transaction: number;
  status_payment: string;
}

const ManageSalesReport = () => {
  const router = useRouter();
  const [searchInputBorderColor, setSearchInputBorderColor] =
    useState("transparent");
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState("none");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Modal Detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailTransactionData, setDetailTransactionData] = useState<any | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/home");
      return;
    }
  });

  const { data: listTransaction } =
    transactionRepository.hooks.useGetAllTransaction({
      page: page,
      page_size: pageSize,
      name_order: searchInput,
      method_name: selectedPaymentMethod,
      start_date: dateRange ? dateRange[0]?.toISOString() ?? "" : "",
      end_date: dateRange ? dateRange[1]?.toISOString() ?? "" : "",
    });

  const transactionData: DataType[] =
    listTransaction?.data?.map((transaction: any, index: number) => ({
      key: transaction.id,
      no: (page - 1) * pageSize + index + 1,
      no_order: transaction.no_order,
      name_order: transaction.name_order,
      payment_method: transaction.paymentMethod.method_name,
      total_price_transaction: Number(transaction.total_price_transaction),
      status_payment: transaction.payment_status,
    })) || [];

  const handleViewDetailTransaction = (id: string) => {
    setDetailTransactionData(id);
    setIsDetailModalOpen(true);
  };

  // const handleExport = async () => {
  //   try {
  //     const params = {
  //       page: page,
  //       page_size: pageSize,
  //       name_order: searchInput,
  //       method_name: selectedPaymentMethod,
  //       start_date: dateRange ? dateRange[0]?.toISOString() ?? "" : "",
  //       end_date: dateRange ? dateRange[1]?.toISOString() ?? "" : "",
  //     };
  
  //     console.log("Export Params:", params);
  
  //     // Memanggil API export dari repository
  //     const response = transactionRepository.api.exportExcel(params);
  //     console.log("Export Params:", response);
      
  //     if (!response) {
  //       throw new Error("Gagal mengekspor file");
  //     }
  
  //     // Membuat link untuk mengunduh file
  //     const url = 'http://localhost:3222/public/sales_report/transaction_report.xlsx';
  //     const link = document.createElement("a");
  //     link.href = url;
  
  //     // Menentukan nama file (sesuai kebutuhan)
  //     link.setAttribute("download", "transaction_report.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  
  //     // Membersihkan URL Object
  //     window.URL.revokeObjectURL(url);
  
  //     // Notifikasi sukses
  //     openSuccessNotification("File berhasil diekspor!");
  //   } catch (error) {
  //     console.error("Export error:", error);
  //     openErrorNotification("Terjadi kesalahan saat mengekspor file.");
  //   }
  // };            

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

  const paymentMethods = (
    <Menu onClick={(e) => setSelectedPaymentMethod(e.key)}>
      <Menu.Item key="">ALL</Menu.Item>
      <Menu.Item key="qris">QRIS</Menu.Item>
      <Menu.Item key="cash">CASH</Menu.Item>
    </Menu>
  );

  // Table columns
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: "center" }}>No</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: <div style={{ textAlign: "center" }}>No Order</div>,
      dataIndex: "no_order",
      key: "no_order",
      align: "center",
      width: "15%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Name Order</div>,
      dataIndex: "name_order",
      key: "name_order",
      align: "center",
      width: "15%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Payment Method</div>,
      dataIndex: "payment_method",
      key: "payment_method",
      align: "center",
      width: "15%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Total Transaction</div>,
      dataIndex: "total_price_transaction",
      key: "total_price_transaction",
      align: "center",
      width: "25%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "status_payment",
      key: "status_payment",
      align: "center",
      width: "10%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      key: "action",
      align: "center",
      width: "10%",
      render: (value) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined style={{ color: "#543310" }} />}
            type="link"
            onClick={() => handleViewDetailTransaction(value.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "15px", borderRadius: "8px" }}>
      {/* Filters and Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Input
            placeholder="Search name_order"
            prefix={<SearchOutlined />}
            style={{
              width: "300px",
              borderRadius: "8px",
              padding: "0px 16px",
              height: "40px",
              borderColor: searchInputBorderColor,
              boxShadow: searchInputBoxShadow,
              outline: `1px solid rgba(0, 0, 0, 0.1)`,
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onMouseEnter={() => {
              setSearchInputBorderColor("#543310");
              setSearchInputBoxShadow("0 4px 12px rgba(84, 51, 16, 0.5)");
            }}
            onMouseLeave={() => {
              setSearchInputBorderColor("transparent");
              setSearchInputBoxShadow("none");
            }}
          />
          <RangePicker
            style={{
              minWidth: "200px",
            }}
            onChange={(dates) => {
              setDateRange(dates as [Dayjs | null, Dayjs | null] | null);
            }}
          />
          <Dropdown
            overlay={paymentMethods}
            trigger={["click"]}
            dropdownRender={(menu) => <div>{menu}</div>}
          >
            <Button style={{ minWidth: "150px" }}>
              {selectedPaymentMethod || "Select Payment Method"}
            </Button>
          </Dropdown>
        </div>
        <Button
          type="primary"
          icon={
            <DownloadOutlined
              style={{ fontWeight: "bold", fontSize: "20px" }}
            />
          }
          style={{
            backgroundColor: "#543310",
            borderRadius: "10px",
            padding: "0 16px",
            height: "40px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "130px",
          }}
          // onClick={handleExport}
        >
          <span
            style={{ fontWeight: "bold", color: "#FFFFFF", fontSize: "16px" }}
          >
            Export
          </span>
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        bordered
        dataSource={transactionData}
        style={{ borderRadius: "8px" }}
        rowClassName={() => "ant-table-row ant-table-row-level-0"}
        size="middle"
        pagination={false}
        components={{
          header: {
            cell: (props: React.HTMLProps<HTMLTableCellElement>) => (
              <th
                {...props}
                style={{ backgroundColor: "#543310", color: "white" }}
              />
            ),
          },
        }}
        footer={() => (
          <div style={{ textAlign: "center" }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={listTransaction?.total}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        )}
      />
      {detailTransactionData && (
        <DetailTransactionModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          id={detailTransactionData}
        />
      )}
    </div>
  );
};

export default ManageSalesReport;
