"use client";
import React, { useState } from 'react';
import { Input, Button, Table, Space, notification } from 'antd';
import { SearchOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { categoryRepository } from '#/repository/category';
import CreateCategoryModal from './CreateCategoryModal';
import { mutate } from 'swr';
import EditCategoryModal from './EditCategoryModal';

// Existing DataType interface
interface DataType {
  key: string;
  no: number;
  category_name: string;
  status_category: string;
}

export default function ManageMenuContent() {
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent'); 
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none'); 
  const [searchInput, setSearchInput] = useState('');

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

  //Column Table
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: 'center' }}>No</div>,
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: '10%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Category Name</div>,
      dataIndex: 'category_name',
      key: 'category_name',
      align: 'center',
      width: '50%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Status</div>,
      dataIndex: 'status_category',
      key: 'status_category',
      align: 'center',
      width: '20%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'action',
      align: 'center',
      width: '20%',
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => {/* Handle view action */}} />
          <Button icon={<EyeOutlined />} type="link" onClick={() => {/* Handle view action */}} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input
          placeholder="Search category name"
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
          style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            padding: '0 16px',
            height: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '130px',
          }}
        >
          <span style={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: '16px' }}>Category</span>
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
