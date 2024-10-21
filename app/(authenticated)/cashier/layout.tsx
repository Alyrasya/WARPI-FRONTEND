"use client"; // Pastikan komponen adalah Client Component

import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, MenuProps } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  DownOutlined, // Import Down Arrow
  UpOutlined,
  MoneyCollectOutlined, // Import Up Arrow
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation"; // Next.js router untuk menghandle navigasi

const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // State untuk menyimpan menu yang dipilih
  const [pageTitle, setPageTitle] = useState("Dashboard"); // State untuk menyimpan judul halaman
  const pathname = usePathname();
  const router = useRouter();

  // Effect untuk mendeteksi perubahan route dan mengubah selected menu serta judul
  useEffect(() => {
    if (pathname) {
      if (pathname.includes("/cashier/dashboard")) {
        setSelectedKey("1");
        setPageTitle("Dashboard");
      } else if (pathname.includes("/cashier/transaction")) {
        setSelectedKey("2");
        setPageTitle("Transaction");
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    console.log("Logged out");
    setDropdownOpen(false); // Menutup dropdown setelah logout
  };

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Menu dropdown untuk logout
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="default"
          onClick={handleLogout}
          style={{ width: "100%" }}
          className="logout-button"
        >
          Logout
        </Button>
      ),
    },
  ];

  // Fungsi untuk menghandle klik di sidebar
  const handleMenuClick = (key: string, path: string, title: string) => {
    setSelectedKey(key); // Update selected menu item
    setPageTitle(title); // Update page title
    router.push(path); // Navigasi ke halaman baru
  };

  // Menu sidebar
  const siderMenuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => handleMenuClick("1", "/cashier/dashboard", "Dashboard"),
      style: {
        backgroundColor:
          selectedKey === "1" ? "rgba(255, 255, 255, 0.2)" : "transparent",
      },
    },
    {
      key: "2",
      icon: <MoneyCollectOutlined />,
      label: "Transaction",
      onClick: () =>
        handleMenuClick("2", "/cashier/transaction", "transaction"),
      style: {
        backgroundColor:
          selectedKey === "2" ? "rgba(255, 255, 255, 0.2)" : "transparent",
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="sidebar fixed top-0 left-0 h-full w-64  " //pakai z-10 untuk sidebar kebelakang navbar dan navbar ditambahkan z-0
        collapsible
        style={{ backgroundColor: "#543310" }}
        trigger={null}
      >
        <div
          className="logo"
          style={{
            padding: "16px",
            textAlign: "center",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.svg" // Ganti dengan path ke logo Anda
            alt="Logo"
            style={{ width: "60px", height: "60px", marginRight: "3px" }} // Sesuaikan ukuran di sini
          />
          <div
            style={{ fontSize: "32px", fontWeight: "bold", color: "#FFF7E9" }}
          >
            warπ
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#543310" }}
          selectedKeys={[selectedKey]}
          items={siderMenuItems}
        />
      </Sider>

      <Layout>
        <Header
          className="header fixed top-[0px] left-[200px] right-[0px] z-10"
          style={{
            background: "#342716",
            padding: "0 16px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ color: "#FFF7E9", fontSize: "20px", margin: 0 }}>
              {pageTitle}
            </h1>{" "}
            {/* Judul Halaman Dinamis */}
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              onClick={handleAvatarClick}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size={27}
                style={{
                  backgroundColor: "#fff",
                  color: "#543310",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UserOutlined
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                />
              </Avatar>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                  lineHeight: "1.3",
                }}
              >
                <span style={{ color: "#FFF7E9", fontWeight: "bold" }}>
                  Username
                </span>
                <span style={{ color: "#FFF7E9" }}>Rolename</span>
              </div>
              {/* Arrow icon */}
              {dropdownOpen ? (
                <DownOutlined
                  style={{
                    marginLeft: "10px",
                    color: "#FFF7E9",
                    fontSize: "10px",
                  }}
                />
              ) : (
                <UpOutlined
                  style={{
                    marginLeft: "10px",
                    color: "#FFF7E9",
                    fontSize: "10px",
                  }}
                />
              )}
            </div>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "48px",
                  right: "0",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  padding: "1px 16px",
                  zIndex: 1000,
                  display: "inline-block",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  transform: dropdownOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  opacity: dropdownOpen ? 1 : 0,
                }}
              >
                <Button
                  type="default"
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    margin: "5px 0",
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #d9d9d9",
                    transition: "border-color 0.3s ease, color 0.3s ease",
                  }}
                  className="logout-button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "red";
                    e.currentTarget.style.color = "red";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#d9d9d9";
                    e.currentTarget.style.color = "#000";
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Header>

        <Content
          className="bg-[#F1F5F9]"
          style={{
            margin: "0px 0px",
            paddingTop: "100px",
            paddingLeft: "200px",
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
