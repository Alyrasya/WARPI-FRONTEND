"use client";
import React from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import axios from 'axios';

const Register: React.FC = () => {
  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('/api/login', values);
      console.log(response.data.message);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div style={{ 
      position: "relative", 
      height: "100vh",
      overflow: "hidden",
  }}>
    {/* Blurred Background */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('./logoKopi.svg')", // Background image of coffee beans
        backgroundSize: "40%",
        backgroundPosition: "center",
        filter: "blur(2px)", // Apply blur effect
        zIndex: 0, // Keep the background behind the form
      }}
    ></div>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
              width: "900px",
              height: "500px",
              borderRadius: "15px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
            }}
          >
            {/* Left Side - Logo (Warπ in a circle) */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                backgroundImage: "url('./logoKopi.svg')", // Coffee beans background
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "20px",
              }}
            >
              <div 
              style={{
                  width: "300px", 
                  height: "300px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
              }}>
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ width: "295px", height: "auto" }}
              />
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div style={{ 
                width: "50%", 
                padding: "3rem", 
                backgroundColor: "white", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                borderLeft: "none" // Removed the border
            }}>
              <Typography.Title level={3} style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold" }}>
                Registration
              </Typography.Title>
              <Form layout="vertical" name="login_form" onFinish={onFinish} initialValues={{ remember: true }}>
              <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="username"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
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
                <div style={{ display: "flex", justifyContent: "center", gap: "180px" }}>
                  <a href="/login" style={{ color: "#4F93F9", textAlign: "center" }}>
                    have account
                  </a>
                  <a href="/home" style={{ color: "#4F93F9", textAlign: "center" }}>
                    back to home
                  </a>
                </div>
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
