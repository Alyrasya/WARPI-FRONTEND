"use client";

import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, MenuProps, Dropdown } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  BarChartOutlined,
  TransactionOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { parseJwt } from "#/utils/convert";

const { Header, Sider, Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [idUser, setIdUser] = useState<string>(""); // New state for idUser
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.role) {
        setRole(payload.role);
      }
      if (payload?.username) {
        setUsername(payload.username);
      }
      if (payload?.id) {
        setIdUser(payload.id);
      }
    }

    if (pathname) {
      // Adjust the URLs to include idUser dynamically
      if (pathname.includes(`/admin/${idUser}/dashboard/`)) {
        setSelectedKey("1");
        setPageTitle("Dashboard");
      } else if (pathname.includes(`/admin/${idUser}/management/account`)) {
        setSelectedKey("2");
        setPageTitle("Manage Account");
      } else if (pathname.includes(`/admin/${idUser}/management/category`)) {
        setSelectedKey("3");
        setPageTitle("Manage Menu");
      } else if (pathname.includes(`/admin/${idUser}/management/report`)) {
        setSelectedKey("4");
        setPageTitle("Sales Report");
      } else if (pathname.includes(`/cashier/${idUser}/dashboard`)) {
        setSelectedKey("1");
        setPageTitle("Dashboard");
      } else if (pathname.includes(`/cashier/${idUser}/transaction`)) {
        setSelectedKey("2");
        setPageTitle("Transaction");
      } else if (pathname.includes(`/customer/${idUser}/dashboard`)) {
        setSelectedKey("1");
        setPageTitle("Dashboard");
      } else if (pathname.includes(`/customer/${idUser}/history`)) {
        setSelectedKey("2");
        setPageTitle("History");
      } else if (pathname.includes(`/customer/${idUser}/keranjang`)) {
        setSelectedKey("3");
        setPageTitle("Keranjang");
      }
    }
  }, [pathname, idUser]); // Add idUser as dependency

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    router.push(`/home`);
    setDropdownOpen(false);
  };

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleMenuClick = (key: string, path: string, title: string) => {
    setSelectedKey(key);
    setPageTitle(title);
    const updatedPath = path.replace(":id", idUser); // Pastikan ID digantikan dengan idUser
    router.push(updatedPath);
  };
  
  // Define menu items based on role
  let siderMenuItems: MenuProps["items"] = [];

  if (role === "admin") {
    siderMenuItems = [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        onClick: () =>
          handleMenuClick("1", `/admin/${idUser}/dashboard`, "Dashboard"),
        style: {
          backgroundColor:
            selectedKey === "1" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "2",
        icon: <UserOutlined />,
        label: "Manage Account",
        onClick: () =>
          handleMenuClick(
            "2",
            `/admin/${idUser}/management/account`,
            "Manage Account"
          ),
        style: {
          backgroundColor:
            selectedKey === "2" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "3",
        icon: <ShoppingOutlined />,
        label: "Manage Menu",
        onClick: () =>
          handleMenuClick(
            "3",
            `/admin/${idUser}/management/category`,
            "Manage Menu"
          ),
        style: {
          backgroundColor:
            selectedKey === "3" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "4",
        icon: <BarChartOutlined />,
        label: "Sales Report",
        onClick: () =>
          handleMenuClick(
            "4",
            `/admin/${idUser}/management/report`,
            "Sales Report"
          ),
        style: {
          backgroundColor:
            selectedKey === "4" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
    ];
  } else if (role === "cashier") {
    siderMenuItems = [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        onClick: () =>
          handleMenuClick("1", `/cashier/${idUser}/dashboard`, "Dashboard"),
        style: {
          backgroundColor:
            selectedKey === "1" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "2",
        icon: <TransactionOutlined />,
        label: "Transaction",
        onClick: () =>
          handleMenuClick("2", `/cashier/${idUser}/transaction`, "Transaction"),
        style: {
          backgroundColor:
            selectedKey === "2" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
    ];
  } else if (role === "customer") {
    siderMenuItems = [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        onClick: () =>
          handleMenuClick("1", `/customer/${idUser}/dashboard`, "Dashboard"),
        style: {
          backgroundColor:
            selectedKey === "1" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "2",
        icon: <HistoryOutlined />,
        label: "History",
        onClick: () =>
          handleMenuClick("2", `/customer/${idUser}/history`, "History"),
        style: {
          backgroundColor:
            selectedKey === "2" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
      {
        key: "3",
        icon: <ShoppingCartOutlined />,
        label: "Keranjang",
        onClick: () =>
          handleMenuClick("3", `/customer/${idUser}/keranjang`, "Keranjang"),
        style: {
          backgroundColor:
            selectedKey === "3" ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
      },
    ];
  }
  

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        style={{
          backgroundColor: "#543310",
          position: "fixed",
          height: "100%",
          left: 0,
        }}
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
            src="/img/logo_warpi.png"
            alt="Logo"
            style={{ width: "70px", height: "60px", marginRight: "3px" }}
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

      {/* Navbar */}
      <Header
        className="header"
        style={{
          position: "fixed",
          top: 0,
          left: 200,
          right: 0,
          background: "#342716",
          padding: "0 16px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              marginTop: "12px",
            }}
          >
            {pageTitle}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          {/* Avatar */}
          <Avatar
            style={{
              backgroundColor: "#FFFFFF",
              color: "#543310",
              marginRight: "9px",
            }}
            icon={<UserOutlined />}
            size={36}
            onClick={handleAvatarClick} // Use handleAvatarClick here
          />

          {/* User Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
              marginRight: "9px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                margin: "0",
                lineHeight: "1",
                fontWeight: "bold",
              }}
            >
              {username}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#ccc",
                marginTop: "3px",
                lineHeight: "1",
              }}
            >
              {role}
            </div>
          </div>

          {/* Dropdown */}
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: "Logout",
                  onClick: handleLogout,
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
            onOpenChange={(open) => setDropdownOpen(open)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <DownOutlined
                style={{
                  color: "white",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "none",
                }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>

      {/* Content */}
      <Layout
        style={{
          marginLeft: "200px",
          backgroundColor: "white",
        }}
      >
        <Content
          style={{
            padding: 24,
            marginTop: 64,
            backgroundColor: "white",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
