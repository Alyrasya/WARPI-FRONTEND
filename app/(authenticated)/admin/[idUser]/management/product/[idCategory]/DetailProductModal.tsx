"use client";
import { Modal, Button } from "antd";
import { productRepository } from "#/repository/product";

interface DetailProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | null;
}

const DetailProductModal = ({
  isOpen,
  onClose,
  id,
}: DetailProductModalProps) => {
  const { data: product } = productRepository.hooks.useGetByIdProduct(id || "");

  const imgProduct = (image: string) =>
    image = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3222"}/category/upload/${image}`;

  return (
    <Modal
      title="Detail Product"
      open={isOpen}
      footer={null} // Menghapus footer bawaan
      onCancel={onClose}
      centered
      style={{ textAlign: "center", fontSize: "16px" }}
    >
      {product ? (
        <div>
          {/* Gambar Produk */}
          <img
            src={imgProduct(product.product_photo)}
            alt={product.product_name || "Product Image"}
            style={{
              width: "100%",
              borderRadius: "6px",
              marginBottom: "15px",
              objectFit: "cover",
              height: "200px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />

          {/* Informasi Produk */}
          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#333" }}>
            {product.product_name}
          </h3>
          <p style={{ margin: "10px 0", color: "#666" }}>
            Description: {product.description}
          </p>
          <p style={{ margin: "5px 0", color: "#666" }}>
            Category: {product.category_name}
          </p>
          <p style={{ margin: "5px 0", color: "#666" }}>
            Stock: {product.stock}
          </p>
          <p style={{ margin: "5px 0", color: "#666" }}>
            Status: {product.status_product}
          </p>
          <p
            style={{
              margin: "10px 0 15px 0",
              color: "#1e7e34",
              fontWeight: "bold",
            }}
          >
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product.price)}
          </p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      {/* Tombol Close di Tengah */}
      <Button
        type="default"
        onClick={onClose}
        style={{
          display: "block",
          margin: "20px auto 0 auto",
          width: "100%",
          height: "40px",
        }}
      >
        Close
      </Button>
    </Modal>
  );
};

export default DetailProductModal;
