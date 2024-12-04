"use client";
import React, { useState } from "react";
import { Input, Button, Table, Space, notification, Pagination } from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  LockFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { userRepository } from "#/repository/user";
import CreateAccountModal from "./CreateAccountModal";
import { mutate } from "swr";
import ResetPasswordModal from "./ResetPasswordModal";
import EditAccountModal from "./EditAccountModal";

interface DataType {
  key: string;
  no: number;
  username: string;
  email: string;
  role: string;
  status_user: string;
}

const ManageAccountContent = () => {
  const [searchInputBorderColor, setSearchInputBorderColor] =
    useState("transparent");
  const [searchInputBoxShadow, setSearchInputBoxShadow] = useState("none");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  //Modal Create
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Handler untuk membuka dan menutup modal
  const handleCreateOpenModal = () => setIsCreateModalOpen(true);
  const handleCreateCloseModal = () => setIsCreateModalOpen(false);

  //Modal Reset
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  // Handler untuk membuka dan menutup modal
  const handleResetOpenModal = () => setIsResetModalOpen(true);
  const handleResetCloseModal = () => setIsResetModalOpen(false);

  //Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAccountData, setEditAccountData] = useState<DataType | null>(null);
  // Handler untuk membuka dan menutup modal
  const handleEditOpenModal = (account: DataType) => {
    setEditAccountData(account);
    setIsEditModalOpen(true);
  };
  const handleEditCloseModal = () => setIsEditModalOpen(false);

  const { data: listCashier } = userRepository.hooks.useGetAllCashier({
    page: page,
    page_size: pageSize,
    usernameOrEmail: searchInput,
  });

  const cashierData: DataType[] =
    listCashier?.data?.map((user: any, index: number) => ({
      key: user.id,
      no: (page - 1) * pageSize + index + 1,
      username: user.username,
      email: user.email,
      role: user.role.role_name,
      status_user: user.status_user,
    })) || [];

  const handleCreateCashier = async ({
    username,
    email,
  }: {
    username: string;
    email: string;
  }) => {
    try {
      const newCashier = await userRepository.api.createCashier({
        username,
        email,
      });
      if (newCashier) {
        openSuccessNotification("Create account cashier berhasil!");
        mutate(
          userRepository.url.getAllCashier({
            page,
            page_size: pageSize,
            usernameOrEmail: searchInput,
          })
        );
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      openErrorNotification("Create account cashier gagal!");
    }
  };

  const handleResetPassword = async () => {
    if (selectedUser) {
      try {
        const reset = await userRepository.api.resetPassword(selectedUser.key);
        if (reset) {
          mutate(
            userRepository.url.getAllCashier({
              page,
              page_size: pageSize,
              usernameOrEmail: searchInput,
            })
          );
          openSuccessNotification("Reset password kasir barhasil!");
          handleResetCloseModal();
        }
      } catch (error) {
        openErrorNotification("Password sudah default, reset password gagal!");
        handleResetCloseModal();
      }
    }
  };

  const handleEditCashier = async (updatedData: { status_user?: string }) => {
    if (!editAccountData) return;
    try {
      const response = await userRepository.api.editStatusCashier(
        editAccountData.key,
        updatedData
      );
      if (response) {
        openSuccessNotification("Edit status user cashier berhasil!");
        mutate(
          userRepository.url.getAllCashier({
            page,
            page_size: pageSize,
            usernameOrEmail: searchInput,
          })
        );
        setIsEditModalOpen(false);
      }
    } catch (error) {
      openErrorNotification("Edit status user cashier gagal.");
    }
  };

  const openSuccessNotification = (message: string) => {
    notification.success({
      message: "Success",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  const openErrorNotification = (message: string) => {
    notification.error({
      message: "Error",
      description: message,
      placement: "top",
      duration: 1.3,
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: <div style={{ textAlign: "center" }}>No</div>,
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Username</div>,
      dataIndex: "username",
      key: "username",
      align: "center",
      width: "20%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Email</div>,
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Role</div>,
      dataIndex: "role",
      key: "role",
      align: "center",
      width: "20%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "status_user",
      key: "status_user",
      align: "center",
      width: "10%",
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      key: "action",
      align: "center",
      width: "20%",
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined style={{ color: "#543310" }} />}
            type="link"
            onClick={() => handleEditOpenModal(record)}
          />
          <Button
            icon={<LockFilled style={{ color: "#543310" }} />}
            type="link"
            onClick={() => {
              setSelectedUser(record);
              handleResetOpenModal();
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "15px", borderRadius: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Search username, email"
          prefix={<SearchOutlined />}
          style={{
            width: "300px",
            borderRadius: "9px",
            padding: "0px 16px",
            height: "40px",
            borderColor: searchInputBorderColor,
            boxShadow: searchInputBoxShadow,
            outline: `1px solid rgba(0, 0, 0, 0.1)`,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onMouseEnter={() => {
            setSearchInputBorderColor("#543310");
            setSearchInputBoxShadow("0 4px 12px rgba(84, 51, 16, 0.5)");
          }}
          onMouseLeave={() => {
            setSearchInputBorderColor("transparent");
            setSearchInputBoxShadow("none");
          }}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "20px" }} />}
          style={{
            backgroundColor: "#000000",
            borderRadius: "10px",
            padding: "0 16px",
            height: "40px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "130px",
          }}
          onClick={handleCreateOpenModal}
        >
          <span
            style={{ fontWeight: "bold", color: "#FFFFFF", fontSize: "16px" }}
          >
            Account
          </span>
        </Button>
      </div>

      <Table
        columns={columns}
        bordered
        dataSource={cashierData}
        style={{ borderRadius: "8px" }}
        rowClassName={() => "ant-table-row ant-table-row-level-0"}
        size="middle"
        pagination={false}
        components={{
          header: {
            cell: (props: React.HTMLProps<HTMLTableCellElement>) => (
              <th
                {...props}
                style={{ backgroundColor: "#543310", color: "white" }}
              />
            ),
          },
        }}
        footer={() => (
          <div style={{ textAlign: "center" }}>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={listCashier?.totalCount || 0}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      />

      <CreateAccountModal
        open={isCreateModalOpen}
        onClose={handleCreateCloseModal}
        onSubmit={handleCreateCashier}
      />

      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={handleResetCloseModal}
        onReset={handleResetPassword}
        account={selectedUser?.key}
      />

      {editAccountData && (
        <EditAccountModal
          open={isEditModalOpen}
          onClose={handleEditCloseModal}
          account={editAccountData}
          onSubmit={handleEditCashier}
        />
      )}
    </div>
  );
};

export default ManageAccountContent;
