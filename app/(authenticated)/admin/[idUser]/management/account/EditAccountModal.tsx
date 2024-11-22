"use client";
import { Modal, Form, Button, Select } from "antd";
import React from "react";

interface EditAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { status_user?: string }) => void;
  account?: { status_user: string };
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  open,
  onClose,
  onSubmit,
  account,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (account) {
      form.setFieldsValue({
        status_user: account.status_user, 
      });
    } else {
      form.resetFields();
    }
  }, [account, form]);

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
      title="Edit Status Account"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      bodyStyle={{ padding: "10px", borderTop: "1px solid #f0f0f0" }}
    >
      <Form
        form={form}
        layout="vertical"
        name="editUserStatusForm"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="status_user"
          label="Status User"
          rules={[{ required: true, message: "Mohon pilih status user!" }]}
        >
          <Select placeholder="Select Status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>

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

export default EditAccountModal;
