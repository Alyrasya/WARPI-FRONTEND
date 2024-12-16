"use client";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { parseJwt } from "#/utils/convert";
import { TokenUtil } from "#/utils/token";
import { authRepository } from "#/repository/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await authRepository.api.login({
        email: values.email,
        password: values.password,
      });
  
      if (response.requiresPasswordChange) {
        openErrorNotification("Password Anda perlu diganti.");
        const token = response.access_token;
        TokenUtil.setAccessToken(token);
        const payload = parseJwt(token);
        const id = payload?.id;
        router.push(`/change_password/${id}`);
      } else {
        const token = response.access_token;
        if (token) {
          const expiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
          TokenUtil.setAccessToken(token);
          TokenUtil.persistToken();
          localStorage.setItem("token", token);
          localStorage.setItem("exp", expiryTime.toString());
  
          openSuccessNotification("Login berhasil!");
  
          const payload = parseJwt(token);
          const role = payload?.role;
          const id = payload?.id;
          const status = payload?.status_user;
  
          if (status === "inactive") {
            openErrorNotification("Akun Anda tidak aktif. Silakan hubungi admin.");
            setLoading(false);
            return;
          }
  
          // Navigasi berdasarkan role
          if (role === "admin") {
            router.push(`/admin/${id}/dashboard`);
          } else if (role === "cashier") {
            router.push(`/cashier/${id}/dashboard`);
          } else if (role === "customer") {
            router.push(`/customer/${id}/dashboard`);
          } else {
            setTimeout(() => {
              router.replace("/login");
            }, 2000);
          }
        } else {
          openErrorNotification("Token tidak valid.");
        }
      }
    } catch (error) {
      openErrorNotification("Login gagal!");
    } finally {
      setLoading(false);
    }
  };  

  const openSuccessNotification = (message: string) => {
    notification.success({
      message: "Sukses",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  const openErrorNotification = (message: string) => {
    notification.error({
      message: "Kesalahan",
      description: message,
      placement: "top",
      duration: 1.3,
    });
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
                  padding: "3rem",
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
                  Login
                </Typography.Title>
                <Form
                  layout="vertical"
                  name="login_form"
                  onFinish={handleLogin}
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Silakan masukkan email anda!",
                      },
                      {
                        type: "email",
                        message: "Format email tidak valid!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="email@gmail.com"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Silakan masukkan password anda!",
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
                      Login
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
                        href="/register"
                        style={{ color: "#4F93F9", textAlign: "center" }}
                      >
                        have account?
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

export default Login;
