"use client";
import React, { useState } from 'react';
import { Input, Button, Table, Space, notification, Pagination } from 'antd';
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

const ManageAccountContent = () => {
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent');
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8)

  // Get categories from API
  const { data: listCashier } = 
  userRepository.hooks.useGetAllCashier({
  page: page,
  page_size: pageSize,
  usernameOrEmail: searchInput,
  });

 // Mapping data yang diambil dari database ke dalam tabel
  const cashierData: DataType[] = listCashier?.data?.map((user: any, index: number) => ({
   key: user.id,
   no: (page - 1) * pageSize + index + 1,    
   username: user.username,
   email: user.email,
   role: user.role.role_name,
   status: user.status_user
  })) || [];
  
  //Nontifikasi Success
  const openSuccessNotification = (message: string) => {
    notification.success({
      message: 'Success',
      description: message,
      placement: 'top',
      duration: 1.3,
    });
  };

  //Nontifikasi Error
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
          />
          <Button 
            icon={<LockFilled />} 
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
          placeholder="Search username, email"
          prefix={<SearchOutlined />}
          style={{
            width: '300px',
            borderRadius: '9px',
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
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />}
          style={{
            backgroundColor: '#000000',
            borderRadius: '10px',
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
        dataSource={cashierData}
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
              total={listCashier?.totalCount || 0}
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
};

export default ManageAccountContent;
