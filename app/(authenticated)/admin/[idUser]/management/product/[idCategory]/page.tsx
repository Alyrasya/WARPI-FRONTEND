"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Table, Space, notification, Pagination } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePathname, useRouter } from "next/navigation";
import { categoryRepository } from "#/repository/category";
import CreateProductModal from "./CreateProductModal";
import { mutate } from "swr";
import { productRepository } from "#/repository/product";
import EditProductModal from "./EditProductModal";
import DetailProductModal from "./DetailProductModal";

interface DataType {
  key: string;
  no: number;
  product_photo: string;
  product_name: string;
  category_name: string;
  price: number;
  stock: number;
  description: string;
  status_product: string;
}

const ManageMenuProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[5];

  const imgProduct = (image: string) =>
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"
    }/category/upload/${image}`;

  const [searchInputBorderColor, setSearchInputBorderColor] =
    useState("transparent");
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState("none");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //Modal Create
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Handler untuk membuka dan menutup modal
  const handleCreateOpenModal = () => setIsCreateModalOpen(true);
  const handleCreateCloseModal = () => setIsCreateModalOpen(false);

  // Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState<any | null>(null);
  const handleEditOpenModal = (product: any) => {
    setEditProductData(product);
    setIsEditModalOpen(true);
  };
  const handleEditCloseModal = () => setIsEditModalOpen(false);

  // Modal Detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailProductData, setDetailProductData] = useState<any | null>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/home");
      return;
    }
  });

  const { data: listProduct } =
    categoryRepository.hooks.useGetProductsByCategory(id || "", {
      page,
      page_size: pageSize,
      product_name: searchInput,
    });

  const productData: DataType[] =
    listProduct?.data?.map((product: any, index: number) => ({
      key: product.id,
      no: (page - 1) * pageSize + index + 1,
      product_photo: product.product_photo,
      product_name: product.product_name,
      category_name: product.category.category_name,
      price: product.price,
      stock: product.stock,
      status_product: product.status_product,
      description: product.description,
    })) || [];

  const handleBack = () => {
    router.back();
  };

  const handleCreateProduct = async ({
    product_name,
    description,
    price,
    product_photo,
  }: {
    product_name: string;
    description: string;
    price: number;
    product_photo: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("id_category", id || "");
      if (product_photo) {
        formData.append("product_photo", product_photo);
      }

      const newProduct = await productRepository.api.createProduct(formData);

      if (newProduct) {
        openSuccessNotification("Create product berhasil!");
        mutate(
          categoryRepository.url.getProductsByCategory(id || "", {
            page,
            page_size: pageSize,
            product_name: searchInput,
          })
        );
      }
    } catch (error) {
      openErrorNotification("Create product gagal!");
    }
    handleCreateCloseModal();
  };

  const handleEditProduct = async ({
    product_name,
    description,
    price,
    stock,
    status_product,
    product_photo,
  }: {
    product_name: string;
    description: string;
    price: number;
    stock: number;
    status_product: string;
    product_photo: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("status_product", status_product);
      formData.append("stock", String(stock));
      if (product_photo) {
        formData.append("product_photo", product_photo);
      }

      const updatedProduct = await productRepository.api.updateProduct(
        editProductData.key,
        formData
      );

      if (updatedProduct) {
        openSuccessNotification("Edit product berhasil!");
        mutate(
          categoryRepository.url.getProductsByCategory(id || "", {
            page,
            page_size: pageSize,
            product_name: searchInput,
          })
        );
      }
    } catch (error) {
      openErrorNotification("Edit product gagal!");
    }
    handleEditCloseModal();
  };

  const handleViewDetailProduct = (id: string) => {
    setIsDetailModalOpen(true);
    setDetailProductData(id);
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

  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: "center" }}>No</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "6%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Photo</div>,
      dataIndex: "product_photo",
      key: "product_photo",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <img
          src={imgProduct(record.product_photo)}
          alt="Product"
          style={{ width: "100px", height: "60px" }}
        />
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Product Name</div>,
      dataIndex: "product_name",
      key: "product_name",
      align: "center",
      width: "15%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Category</div>,
      dataIndex: "category_name",
      key: "category_name",
      align: "center",
      width: "12%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Stock</div>,
      dataIndex: "stock",
      key: "stock",
      align: "center",
      width: "11%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Price</div>,
      dataIndex: "price",
      key: "price",
      align: "center",
      width: "14%",
      render: (text) => {
        const formattedPrice = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(text);

        return <span>{formattedPrice}</span>;
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "status_product",
      key: "status_product",
      align: "center",
      width: "11%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      key: "action",
      align: "center",
      width: "11%",
      render: (value) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined style={{ color: "#543310" }} />}
            type="link"
            onClick={() => handleEditOpenModal(value)}
          />
          <Button
            icon={<EyeOutlined style={{ color: "#543310" }} />}
            type="link"
            onClick={() => handleViewDetailProduct(value.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "15px", borderRadius: "8px" }}>
      <Button
        type="link"
        icon={
          <ArrowLeftOutlined
            style={{ fontSize: "18px", fontWeight: "bold", color: "#543310" }}
          />
        }
        style={{ marginBottom: "10px", fontWeight: "bold", color: "#543310" }}
        onClick={handleBack}
      >
        Back
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Search product name"
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
        <Button
          type="primary"
          icon={
            <PlusCircleOutlined
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
          onClick={handleCreateOpenModal}
        >
          <span
            style={{ fontWeight: "bold", color: "#FFFFFF", fontSize: "16px" }}
          >
            Product
          </span>
        </Button>
      </div>

      <Table
        columns={columns}
        bordered
        dataSource={productData}
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
              pageSize={pageSize}
              current={page}
              total={listProduct?.totalCount || 0}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        )}
      />

      <CreateProductModal
        open={isCreateModalOpen}
        onClose={handleCreateCloseModal}
        onSubmit={handleCreateProduct}
      />

      {editProductData && (
        <EditProductModal
          open={isEditModalOpen}
          onClose={handleEditCloseModal}
          onSubmit={handleEditProduct}
          product={editProductData}
        />
      )}

      {detailProductData && (
        <DetailProductModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          id={detailProductData}
        />
      )}
    </div>
  );
};

export default ManageMenuProduct;
