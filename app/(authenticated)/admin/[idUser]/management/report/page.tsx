"use client";
import React, { useState } from 'react';
import { Input, Button, Table, Space, notification, Pagination, Col, Dropdown, DatePicker } from 'antd';
import { SearchOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { categoryRepository } from '#/repository/category';

interface DataType {
//   key: string;
//   no: number;
//   category_name: string;
//   status_category: string;
}

const ManageSalesReport = () => {
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent');
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  
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

  // Column Table
  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: 'center' }}>No</div>,
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: '10%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>No Order</div>,
      dataIndex: 'no_order',
      key: 'no_order',
      align: 'center',
      width: '15%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Name Order</div>,
      dataIndex: 'name_order',
      key: 'name_order',
      align: 'center',
      width: '15%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Payment Method</div>,
      dataIndex: 'payment_method',
      key: 'payment_method',
      align: 'center',
      width: '15%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Total Transaction</div>,
      dataIndex: 'total_price_transaction',
      key: 'total_price_transaction',
      align: 'center',
      width: '25%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Status</div>,
      dataIndex: 'status_payment',
      key: 'status_payment',
      align: 'center',
      width: '10%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined style={{color: '#543310'}}/>} 
            type="link"
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '15px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input
          placeholder="Search category name"
          prefix={<SearchOutlined />}
          style={{
            width: '300px',
            borderRadius: '8px',
            padding: '0px 16px',
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
      </div>

      <Table
        columns={columns}
        bordered
        // dataSource={categoryData}
        style={{ borderRadius: '8px' }}
        rowClassName={() => 'ant-table-row ant-table-row-level-0'}
        size="middle"
        pagination={false}
        components={{
          header: {
            cell: (props: React.HTMLProps<HTMLTableCellElement>) => (
              <th {...props} style={{ backgroundColor: '#543310', color: 'white' }} />
            ),
          },
        }}
        footer={() => (
          <div style={{ textAlign: 'center' }}>
            <Pagination
              pageSize={pageSize}
              current={page}
            //   total={listCategory?.totalCount || 0}
              onChange={(newPage) => {
                setPage(newPage);
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      />
    </div>
  );
}

export default ManageSalesReport;
