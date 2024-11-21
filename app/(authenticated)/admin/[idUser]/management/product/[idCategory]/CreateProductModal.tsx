import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateProductModal = ({
  open,
  onClose,
  onSubmit,
  initialProductPhoto,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    product_name: string;
    description: string;
    price: number;
    product_photo: File | null;
  }) => void;
  initialProductPhoto?: string;
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>(
    initialProductPhoto
      ? [
          {
            uid: "-1",
            name: "Product Photo",
            status: "done",
            url: initialProductPhoto,
          },
        ]
      : []
  );

  const handleUpload = ({ file }: { file: File }) => {
    setFile(file);
    setFileList([
      {
        uid: file || String(Date.now()),
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file),
      },
    ]);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit({
        ...values,
        product_photo: file,
      });
      form.resetFields();
      setFile(null);
      setFileList(
        initialProductPhoto
          ? [
              {
                uid: "-1",
                name: "Product Photo",
                status: "done",
                url: initialProductPhoto,
              },
            ]
          : []
      );
    });
  };

  const handleClose = () => {
    form.resetFields();
    setFile(null);
    setFileList(
      initialProductPhoto
        ? [
            {
              uid: "-1",
              name: "Product Photo",
              status: "done",
              url: initialProductPhoto,
            },
          ]
        : []
    );
    onClose();
  };

  return (
    <Modal
      title="Buat Produk"
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="product_name"
          label="Nama Produk"
          rules={[{ required: true, message: "Harap masukkan nama produk!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Deskripsi"
          rules={[{ required: true, message: "Harap masukkan deskripsi produk!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Harga"
          rules={[{ required: true, message: "Harap masukkan harga produk!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            parser={(value) => value?.replace(/\Rp\s?|(\.*)/g, "") || ""}
            formatter={(value) =>
              value
                ? `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "Rp 0"
            }
          />
        </Form.Item>
        <Form.Item label="Foto Produk">
          <Upload
            beforeUpload={(file) => {
              handleUpload({ file });
              return false;
            }}
            fileList={fileList}
            onRemove={() => {
              setFile(null);
              setFileList([]);
            }}
            maxCount={1}
            accept=".jpg,.jpeg,.png"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Photo Product</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;