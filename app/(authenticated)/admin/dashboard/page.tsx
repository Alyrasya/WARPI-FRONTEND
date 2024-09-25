"use client";
import { Row, Col, Card, Statistic } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, FileTextOutlined, BarChartOutlined } from '@ant-design/icons';

export default function DashboardPage() {
  return (
    <div style={{ padding: '16px' }}>
      {/* Bagian atas: 3 kotak */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px', // Mengurangi padding
              border: '3px solid #E2E8F0',
              minHeight: '130px' // Menyesuaikan tinggi minimal
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <ShoppingCartOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>Total Category</h4>}
                value={50}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px', // Mengurangi padding
              border: '3px solid #E2E8F0',
              minHeight: '130px' // Menyesuaikan tinggi minimal
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <ShoppingCartOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>Total Product</h4>}
                value={50}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px', // Mengurangi padding
              border: '3px solid #E2E8F0',
              minHeight: '130px' // Menyesuaikan tinggi minimal
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <UserOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>Total Cashier</h4>}
                value={50}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bagian tengah: 2 kotak */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px', 
              minHeight: '130px',
              border: '3px solid #E2E8F0'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <FileTextOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>Total Transaction</h4>}
                value={50}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
              />
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px', 
              minHeight: '130px',
              border: '3px solid #E2E8F0'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <BarChartOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>Total Monthly Income</h4>}
                value={1000000000}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
                formatter={value => `Rp. ${value.toLocaleString('id-ID')},00`}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bagian bawah: 1 kotak */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              padding: '8px',
              border: '3px solid #E2E8F0'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ backgroundColor: '#543310', borderRadius: '8px', padding: '8px', marginBottom: '8px', display: 'inline-block' }}>
                <DollarOutlined style={{ color: '#FFFFFF', fontSize: '38px' }} />
              </div>
              <Statistic
                title={<h4 style={{ fontSize: '16px', color: '#543310' }}>All Total Income</h4>}
                value={1000000000}
                valueStyle={{ color: '#64748B', fontSize: '18px', fontWeight: 'bold' }}
                formatter={value => `Rp. ${value.toLocaleString('id-ID')},00`}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
