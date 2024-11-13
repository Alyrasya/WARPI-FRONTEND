"use client";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { userRepository } from "#/repository/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const response = await userRepository.api.createCustomer({
        username: values.username,
        email: values.email,
        password: values.password
      });
      if (response.status === 201) {
        openSuccessNotification('Registrasi berhasil!');
        router.push('/login');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        openErrorNotification(error.response.data.message || 'Registration gagal!');
      } else {
        openErrorNotification('Email sudah ada!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <App>
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('./img/bg_kopi.png')",
            backgroundSize: "40%",
            backgroundPosition: "center",
            filter: "blur(2px)",
            zIndex: 0,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  backgroundImage: "url('./img/bg_kopi.png')",
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
                  }}
                >
                  <img
                    src="/img/logo_warpi.png"
                    alt="Logo"
                    style={{ width: "295px", height: "auto" }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: "50%",
                  padding: "2rem",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: "none",
                }}
              >
                <Typography.Title
                  level={3}
                  style={{
                    textAlign: "center",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Registration
                </Typography.Title>
                <Form 
                  layout="vertical" 
                  name="register_form" 
                  onFinish={handleRegister}
                >
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: "Silahkan masukan username!",
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="username" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { 
                        required: true, 
                        message: "Silahkan masukkan email!" 
                      },
                      {
                        type: "email",
                        message: "Format email tidak valid!",
                      }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="user@gmail.com"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Silahkan masukan password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      style={{
                        backgroundColor: "#543310",
                        borderColor: "#543310",
                      }}
                    >
                      Register
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "180px",
                      }}
                    >
                      <a
                        href="/login"
                        style={{ color: "#4F93F9", textAlign: "center" }}
                      >
                        have account
                      </a>
                      <a
                        href="/home"
                        style={{ color: "#4F93F9", textAlign: "center" }}
                      >
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
    </App>
  );
};

export default Register;
