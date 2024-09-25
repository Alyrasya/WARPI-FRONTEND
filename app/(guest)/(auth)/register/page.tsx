"use client";

import React from "react";
import Head from "next/head";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from 'axios';

const Register: React.FC = () => {
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('/api/register', values);
      console.log(response.data.message);
      // Anda bisa menambahkan logika untuk menangani pendaftaran berhasil di sini
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data?.message || 'Unknown error');
      // Anda bisa menambahkan logika untuk menangani pendaftaran gagal di sini
    }
  };

  return (
    <div style={{ 
        backgroundImage: "url('./logoKopi.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        overflow: "hidden",
    }}>
      <Head>
        <title>Warphi - Register</title>
      </Head>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <div
            style={{
              backgroundImage: "url('/logoKopi.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
              width: "800px",
              height: "400px",
            }}
          >
            {/* Left Side - Logo */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ width: "160px", height: "auto" }}
              />
            </div>

            {/* Right Side - Register Form */}
            <div style={{ 
                width: "50%", 
                padding: "2rem", 
                backgroundColor: "white", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center" 
            }}>
              <Typography.Title level={3} style={{ textAlign: "center" }}>
                Register
              </Typography.Title>
              <Form layout="vertical" name="register_form" onFinish={onFinish} initialValues={{ remember: true }}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="user@gmail.com"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ backgroundColor: "#543310", borderColor: "#543310" }}
                  >
                    Register
                  </Button>
                </Form.Item>
                <Form.Item>
                  <a href="/login" style={{ color: "#4F93F9", display: "block", textAlign: "center" }}>
                    Already have an account? Login here.
                  </a>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;