"use client";
import React, { useEffect, useState } from 'react';
import { Input, Button, Table, Space, notification } from 'antd';
import { SearchOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateCategoryModal from './CreateCategoryModal';
import axios from 'axios';
import EditCategoryModal from './EditCategoryModal';

interface DataType {
  key: string;
  no: number;
  category_name: string;
  status_category: string;
}

export default function ManageMenuContent() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent'); 
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none'); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editingCategory, setEditingCategory] = useState<DataType | null>(null); 

  const openSuccessNotification = (message: string) => {
    notification.success({
      message: 'Success',
      description: message,
      placement: 'top',
      duration: 1.3,
    });
  };

  const openErrorNotification = (message: string) => {
    notification.error({
      message: 'Error',
      description: message,
      placement: 'top',
      duration: 1.3,
    });
  };

  const handleCreateCategory = async (category_name: string) => {
    try {
      const response = await axios.post('http://localhost:3222/category/createCategory', {
        category_name
      });

      const newCategory: DataType = {
        key: response.data.key,
        no: dataSource.length + 1,
        category_name,
        status_category: 'active',
      };

      setDataSource([...dataSource, newCategory]);
      setIsModalOpen(false); 
      openSuccessNotification('Category created successfully!');
    } catch (error) {
      console.error('Error creating category:', error);
      openErrorNotification('Failed to create category. Please try again.');
    }
  };

  const handleEditCategory = async (category_name?: string, status_category?: string) => {
    if (editingCategory) {
      try {
        const updatedData: { category_name?: string; status_category?: string } = {};
        if (category_name) updatedData.category_name = category_name; 
        if (status_category) updatedData.status_category = status_category; 

        await axios.put(`http://localhost:3222/category/${editingCategory.key}`, updatedData);

        setDataSource((prevData) =>
          prevData.map(item =>
            item.key === editingCategory.key
              ? { ...item, ...(category_name && { category_name }), ...(status_category && { status_category }) }
              : item
          )
        );

        setIsEditModalOpen(false);
        setEditingCategory(null); 
        openSuccessNotification('Category updated successfully!');
      } catch (error) {
        console.error('Error updating category:', error);
        openErrorNotification('Failed to update category. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3222/category');
        const data = await response.json();

        const formattedData: DataType[] = data.category.map((item: any, index: number) => ({
          key: item.id,
          no: index + 1,
          category_name: item.category_name,
          status_category: item.status_category,
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (record: DataType) => {
    setEditingCategory(record); 
    setIsEditModalOpen(true); 
  };

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
          <Button icon={<EditOutlined />} type="link" onClick={() => handleOpenEditModal(record)} />
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
          onClick={handleOpenModal}
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

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateCategory}
      />

      {editingCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditCategory}
          initialCategoryName={editingCategory.category_name}
          initialStatusCategory={editingCategory.status_category}
        />
      )}
    </div>
  );
}
