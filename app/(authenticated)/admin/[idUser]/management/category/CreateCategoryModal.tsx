"use client";
import { Modal, Form, Input, Button } from "antd";

interface CreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { category_name: string }) => void;
}

const CreateCategorytModal: React.FC<CreateCategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Create Category"
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
          name="createAccountForm"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: "Mohon masukan nama kategori" }]}
          >
            <Input placeholder="Masukan nama kategori" />
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
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCategorytModal;
