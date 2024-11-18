"use client";
import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

interface CreateAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { username: string; email: string }) => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values); // Call the onSubmit handler with form values
        form.resetFields(); // Reset the form fields
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Create Account"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="createAccountForm"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter the username",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter the email",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateAccountModal;
