"use client";
import React, { useEffect, useState } from 'react';
import { Input, Button, Table, Space, notification, Pagination } from 'antd';
import { SearchOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { categoryRepository } from '#/repository/category';
import { useRouter } from 'next/navigation';
import { parseJwt } from '#/utils/convert';
import CreateCategorytModal from './CreateCategoryModal';
import { mutate } from 'swr';
import EditCategoryModal from './EditCategoryModal';

// Existing DataType interface
interface DataType {
  key: string;
  no: number;
  category_name: string;
  status_category: string;
}

const ManageMenuCategory = () => {
  const [searchInputBorderColor, setSearchInputBorderColor] = useState('transparent');
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState('none');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [idUser, setIdUser] = useState<string>("");
  const router = useRouter();

  //Modal Create
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Handler untuk membuka dan menutup modal
  const handleCreateOpenModal = () => setIsCreateModalOpen(true);
  const handleCreateCloseModal = () => setIsCreateModalOpen(false);

  //Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<DataType | null>(null);
  // Handler untuk membuka dan menutup modal
  const handleEditOpenModal = (category: DataType) => {
    setEditCategoryData(category);
    setIsEditModalOpen(true);
  };
  const handleEditCloseModal = () => setIsEditModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.id) {
        setIdUser(payload.id);
      }
    }
  }, []);

  const { data: listCategory } = 
    categoryRepository.hooks.useGetAllCategory({
      page: page,
      page_size: pageSize,
      category_name: searchInput,
  });

  const categoryData: DataType[] = 
    listCategory?.data?.map((category: any, index: number) => ({
      key: category.id,
      no: (page - 1) * pageSize + index + 1,
      category_name: category.category_name,
      status_category: category.status_category,
  })) || [];   

  const handleCreateCategory = async ({ category_name }: { category_name: string }) => {
    try {
      const newCashier = await categoryRepository.api.createCategory({ category_name });
      if (newCashier){
        openSuccessNotification('Create category berhasil!');
        mutate(categoryRepository.url.getAllCategory({ page, page_size: pageSize, category_name: searchInput }));
      }
    } catch (error) {
      openErrorNotification('Create category gagal!');
    }
    setIsCreateModalOpen(false);
  }; 

  const handleEditCategory = async (updatedData: { category_name?: string; status_category?: string }) => {
    if (!editCategoryData) return;
    try {
      const response = await categoryRepository.api.updateCategory(editCategoryData.key, updatedData);
      if (response) {
        openSuccessNotification('Edit category berhasil!');
        mutate(categoryRepository.url.getAllCategory({ page, page_size: pageSize, category_name: searchInput }));
      }
    } catch (error) {
      openErrorNotification('Edit category gagal!');
    }
    setIsEditModalOpen(false);
  };
  
  const handleViewProduct = (id: string) => {
    router.push(`/admin/${idUser}/management/product/${id}`);
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
          <Button 
            icon={<EditOutlined style={{color: '#543310'}}/>} 
            type="link" 
            onClick={() => handleEditOpenModal(record)} 
          />
          <Button 
            icon={<EyeOutlined style={{color: '#543310'}}/>} 
            type="link"
            onClick={() => handleViewProduct(record.key)}
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
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontWeight: "bold", fontSize: '20px' }} />}
          style={{
            backgroundColor: '#543310',
            borderRadius: '10px',
            padding: '0 16px',
            height: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '130px',
          }}
          onClick={handleCreateOpenModal}
        >
          <span style={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: '16px' }}>Category</span>
        </Button>
      </div>

      <Table
        columns={columns}
        bordered
        dataSource={categoryData}
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
              total={listCategory?.totalCount || 0}
              onChange={(newPage) => {
                setPage(newPage);
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      />

      <CreateCategorytModal 
        open={isCreateModalOpen} 
        onClose={handleCreateCloseModal} 
        onSubmit={handleCreateCategory} 
      />

      {editCategoryData && (
        <EditCategoryModal
          open={isEditModalOpen}
          onClose={handleEditCloseModal}
          category={editCategoryData}
          onSubmit={handleEditCategory}
        />
      )}
    </div>
  );
}

export default ManageMenuCategory;
