import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    product_name: string;
    description: string;
    price: number;
    stock: number;
    status_product: string;
    product_photo: File | null;
  }) => void;
  product: {
    product_name: string;
    description?: string;
    price: number;
    stock: number;
    status_product: string;
    product_photo: string;
  };
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  product,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        status_product: product.status_product,
        stock: product.stock,
      });

      setFileList([
        {
          uid: product.product_photo,
          name: product.product_photo,
          status: "done",
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3222'}/category/upload/${product.product_photo}`
        },
      ]);
    }
  }, [product, form]);

  const handleFinish = (values: any) => {
    const productPhotoFile =
      fileList.length > 0 && fileList[0].originFileObj
        ? fileList[0].originFileObj
        : null;

    onSubmit({
      product_name: values.product_name,
      description: values.description,
      price: values.price,
      stock: values.stock,
      status_product: values.status_product,
      product_photo: productPhotoFile || product.product_photo,
    });

    form.resetFields();
    setFileList([]);
  };

  const handleFileChange = ({ file, fileList }: any) => {
    if (file.status !== "uploading") {
      setFileList(fileList.slice(-1));
    }
  };

  return (
    <Modal
      open={open}
      title="Edit Product"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save Changes
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber
            placeholder="Enter product price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please enter the stock quantity" }]}
        >
          <InputNumber
            placeholder="Enter stock quantity"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
            name="status_product"
            label="Status Product"
            rules={[{ required: true, message: "Mohon pilih status kategori!" }]}
          >
            <Select placeholder="Select Status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Product Photo">
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            listType="picture"
          >
            {fileList.length === 0 && (
              <Button icon={<UploadOutlined />}>Upload Product Photo</Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;


