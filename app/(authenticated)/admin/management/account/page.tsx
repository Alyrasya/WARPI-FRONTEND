"use client";
import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Space, notification } from 'antd';
import { SearchOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateAccountModal from './CreateAccountModal';
import axios from 'axios';
import EditAccountModal from './EditAccountModal';

interface DataType {
  key: string;
  no: number;
  username: string;
  email: string;
  role: string;
  status: string;
}

export default function ManageAccountContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent');
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none');
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);

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

  const handleEdit = (account: DataType) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  // Create new account
  const handleCreateAccount = async (username: string, email: string) => {
    try {
      const response = await axios.post('http://localhost:3222/user/createCashier', {
        username,
        email,
      });

      const newUser: DataType = {
        key: response.data.key,
        no: dataSource.length + 1,
        username,
        email,
        role: 'cashier',
        status: 'active',
      };

      setDataSource([...dataSource, newUser]);
      setIsModalOpen(false);
      openSuccessNotification('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      openErrorNotification('Failed to create account. Please try again.');
    }
  };

  const handleEditAccount = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:3222/user/editStatus/${id}`, {
        status_user: status,
      });

      setDataSource(prevDataSource =>
        prevDataSource.map(account =>
          account.key === id ? { ...account, status } : account
        )
      );

      setIsEditModalOpen(false);
      openSuccessNotification('Account status updated successfully!');
    } catch (error) {
      console.error('Error updating account status:', error);
      openErrorNotification('Failed to update account status. Please try again.');
    }
  };

  // Fetch cashiers data
  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const response = await axios.get('http://localhost:3222/user/cashiers');
        if (response.data && Array.isArray(response.data.cashiers)) {
          const cashierData = response.data.cashiers.map((cashier: any, index: number) => ({
            key: cashier.id, // Assuming 'id' is a unique identifier for cashiers
            no: index + 1,
            username: cashier.username,
            email: cashier.email,
            role: cashier.role_name,
            status: cashier.status_user,
          }));
          setDataSource(cashierData);
        } else {
          console.error('Response data.cashiers is not an array:', response.data.cashiers);
        }
      } catch (error) {
        console.error('Error fetching cashiers:', error);
      }
    };

    fetchCashiers();
  }, []);

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
            onClick={() => handleEdit(record)} 
          />
          <Button icon={<EyeOutlined />} type="link" />
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
          onClick={() => setIsModalOpen(true)}
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
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
        rowClassName={() => 'ant-table-row ant-table-row-level-0'}
        size="middle"
        components={{
          header: {
            cell: (props: React.HTMLProps<HTMLTableCellElement>) => (
              <th {...props} style={{ backgroundColor: '#543310', color: 'white' }} />
            ),
          },
        }}
      />

      {/* Modal for creating a new account */}
      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAccount}
      />

      {/* Modal for editing an account */}
      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(newStatus?: string) => {
          if (selectedAccount) {
            handleEditAccount(selectedAccount.key, newStatus || ''); // Call handleEditAccount when submitting
          }
        }}
        userEmail={selectedAccount?.email || ''} // Pass userEmail if needed
        initialStatusUser={selectedAccount?.status || ''} // Pass initialStatus
        accountId={selectedAccount?.key || ''} // Pass accountId
      />
    </div>
  );
}
