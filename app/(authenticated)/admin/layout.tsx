"use client"; // Ini memberi tahu Next.js bahwa ini adalah Client Component

import { ReactNode, useState, useEffect } from 'react';
import { Layout, Avatar, Dropdown, Button, Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

type LayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('1');
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk mengatur dropdown

  useEffect(() => {
    if (pathname) {
      if (pathname.includes('/admin/dashboard')) {
        setSelectedKey('1');
      } else if (pathname.includes('/admin/management/account')) {
        setSelectedKey('2');
      } else if (pathname.includes('/admin/management/product')) {
        setSelectedKey('3');
      } else if (pathname.includes('/admin/management/report')) {
        setSelectedKey('4');
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    // Logika untuk logout
    console.log('Logged out');
    setDropdownOpen(false); // Menutup dropdown setelah logout
  };

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev); // Mengubah state untuk membuka/menutup dropdown
  };

  // Menu untuk dropdown
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="default" onClick={handleLogout} style={{ width: '100%' }}>
          Logout
        </Button>
      ),
    },
  ];

  // Menu untuk sidebar
  const siderMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard" style={{ color: '#FFF7E9' }}>Dashboard</Link>,
      style: {
        backgroundColor: selectedKey === '1' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        color: '#FFF7E9',
      },
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link href="/admin/management/account" style={{ color: '#FFF7E9' }}>Manage Account</Link>,
      style: {
        backgroundColor: selectedKey === '2' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        color: '#FFF7E9',
      },
    },
    {
      key: '3',
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/management/product" style={{ color: '#FFF7E9' }}>Product</Link>,
      style: {
        backgroundColor: selectedKey === '3' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        color: '#FFF7E9',
      },
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: <Link href="/admin/management/report" style={{ color: '#FFF7E9' }}>Sales Report</Link>,
      style: {
        backgroundColor: selectedKey === '4' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        color: '#FFF7E9',
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible style={{ backgroundColor: '#543310' }} trigger={null}>
        <div className="logo" style={{ padding: '16px', textAlign: 'center', color: 'white' }}>
          <Avatar size="large" style={{ backgroundColor: '#D2691E' }}>A</Avatar>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: '#543310' }}
          items={siderMenuItems} // Gunakan `items` untuk mendefinisikan menu
        />
      </Sider>

      <Layout>
        <Header
          className="header"
          style={{
            background: '#342716',
            padding: '0 16px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ color: '#FFF7E9', fontSize: '18px', margin: 0 }}>Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown
              menu={{ items: menuItems }} // Menggunakan menu dengan item logout
              open={dropdownOpen} // Mengontrol status dropdown (buka/tutup)
              onOpenChange={(open) => setDropdownOpen(open)} // Mengubah status dropdown saat terbuka atau tertutup
              trigger={['click']}
            >
              <div onClick={handleAvatarClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: '#D2691E' }} icon={<UserOutlined />} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', lineHeight: '1.5' }}>
                  <span style={{ color: '#FFF7E9' }}>Username</span>
                  <span style={{ color: '#FFF7E9' }}>Rolename</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#FFF7E9',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
