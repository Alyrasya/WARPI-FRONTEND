"use client";
import React, { useState, useEffect, use } from 'react';
import { Input, Button, Table, Space, notification } from 'antd';
import { SearchOutlined, EditOutlined, PlusCircleOutlined, LockFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { userRepository } from '#/repository/user';

interface DataType {
  key: string;
  no: number;
  username: string;
  email: string;
  role: string;
  status: string;
}

export default function ManageAccountContent() {
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent');
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none');
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open & Close Modal Create Category
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Success notification
  const openSuccessNotification = (message: string) => {
    notification.success({
      message: 'Success',
      description: message,
      placement: 'top',
      duration: 1.3,
    });
  };

  // Error notification
  const openErrorNotification = (message: string) => {
    notification.error({
      message: 'Error',
      description: message,
      placement: 'top',
      duration: 1.3,
    });
  };

  // Define columns for the table
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: 'center' }}>No</div>,
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: '10%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Username</div>,
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      width: '20%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Email</div>,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '20%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Role</div>,
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      width: '20%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Status</div>,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'action',
      align: 'center',
      width: '20%',
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            type="link" 
            onClick={() => (record)} 
          />
          <Button 
            icon={<LockFilled />} 
            type="link" 
            onClick={() => (record.key)} // Open reset password modal
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input
          placeholder="Search email"
          prefix={<SearchOutlined />}
          style={{
            width: '300px',
            borderRadius: '12px',
            padding: '8px 16px',
            height: '40px',
            borderColor: searchInputBorderColor,
            boxShadow: searchInputBoxShadow,
            outline: `1px solid rgba(0, 0, 0, 0.1)`,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
          onChange={(e) => setSearchInput(e.target.value)} // Update search input

          onMouseEnter={() => {
            setSearchInputBorderColor('#543310');
            setSearchInputBoxShadow('0 4px 12px rgba(84, 51, 16, 0.5)');
          }}
          onMouseLeave={() => {
            setSearchInputBorderColor('transparent');
            setSearchInputBoxShadow('none');
          }}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />}
          onClick={openModal}
          style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: '0 16px',
            height: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '130px',
          }}
        >
          <span style={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: '16px' }}>Account</span>
        </Button>
      </div>

      <Table
        columns={columns}
        bordered
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
        rowClassName={() => 'ant-table-row ant-table-row-level-0'}
        size="middle"
        pagination={{
          position: ['bottomCenter'],
          pageSize: 8,
        }}
        components={{
          header: {
            cell: (props: React.HTMLProps<HTMLTableCellElement>) => (
              <th {...props} style={{ backgroundColor: '#543310', color: 'white' }} />
            ),
          },
        }}
      />
    </div>
  );
}
