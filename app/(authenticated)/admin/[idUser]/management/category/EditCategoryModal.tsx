"use client";
import { Modal, Form, Input, Button, Select } from "antd";
import React from "react";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { category_name?: string; status_category?: string }) => void;
  category?: { category_name: string; status_category: string };
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
  category,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (category) {
      form.setFieldsValue({
        category_name: category.category_name,
        status_category: category.status_category,
      });
    }
  }, [category, form]);

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedValues: { category_name?: string; status_category?: string } = {};
        
        if (values.category_name !== category?.category_name) {
          updatedValues.category_name = values.category_name;
        }

        if (values.status_category !== category?.status_category) {
          updatedValues.status_category = values.status_category;
        }

        onSubmit(updatedValues);

        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Edit Category"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      bodyStyle={{ padding: "10px", borderTop: "1px solid #f0f0f0" }}
    >
      {/* Content Section */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <Form
          form={form}
          layout="vertical"
          name="editCategoryForm"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: "Mohon masukan nama kategori" }]}
          >
            <Input placeholder="Masukan nama kategori" />
          </Form.Item>

          <Form.Item
            name="status_category"
            label="Status Category"
            rules={[{ required: true, message: "Mohon pilih status kategori!" }]}
          >
            <Select placeholder="Select Status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

      {/* Footer Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "14px",
        }}
      >
        <Button onClick={onClose} style={{ marginRight: "8px" }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleFormSubmit}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
