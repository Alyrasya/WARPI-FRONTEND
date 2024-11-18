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
import { LockOutlined } from "@ant-design/icons";
import { userRepository } from "#/repository/user";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";

const ChangePassword = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const idUser = params?.idUser as string | undefined;

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

  const handleChangePassword = async (values: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if( currentPassword !== "cashier123"){
      openErrorNotification(
        "Password saat ini tidak sesuai!"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      openErrorNotification(
        "Password baru dan konfirmasi password tidak cocok!"
      );
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    setLoading(true);

    try {
      const response: any = await userRepository.api.editPassword(
        idUser!,
        data
      );
      if (response) {
        openSuccessNotification("Mengubah password berhasil!, silahkan login ulang");
        setTimeout(() => {
          router.push(`/home`);
        }, 2500);
      } else {
        openErrorNotification("Mengubah password gagal");
      }
    } catch (error) {
      openErrorNotification("Terjadi kesalahan saat mengubah password.");
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
                  Change Password
                </Typography.Title>
                <Form layout="vertical" name="changePassword_form" onFinish={handleChangePassword}>
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[
                      {
                        required: true,
                        message: "Silakan masukkan password saat ini!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="current password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Silakan masukkan password baru!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="New Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: "Silakan konfirmasi password baru!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{
                        backgroundColor: "#543310",
                        borderColor: "#543310",
                      }}
                      loading={loading}
                    >
                      Change
                    </Button>
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

export default ChangePassword;
