"use client"; // Ensure this is a client component
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
  onSubmit: (statusUser?: string) => void; // Function to submit the updated status
  userEmail: string; // Display the user's email
  initialStatusUser: string; // Initial status of the user
  accountId: string; // Add accountId here
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function EditAccountModal({
  isOpen,
  onClose,
  onSubmit,
  userEmail,
  initialStatusUser,
  accountId, // Include accountId here
}: EditAccountModalProps) {
  const [statusUser, setStatusUser] = useState<string>(initialStatusUser);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOk = () => {
    if (statusUser !== initialStatusUser) {
      onSubmit(statusUser); // This will always be a string
    }
    onClose();
    router.refresh();
  };

  const handleCancel = () => {
    setStatusUser(initialStatusUser); // Reset to initial value
    onClose();
    router.refresh();
  };

  // Event handler untuk mengubah warna border saat di-hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'red'; // Mengubah border-color menjadi merah saat hover
    e.currentTarget.style.color = 'red'; // Mengubah teks menjadi merah
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = ''; // Menghapus perubahan border-color
    e.currentTarget.style.color = ''; // Menghapus perubahan warna teks
  };

  return (
    <Modal
      title="Edit Account"
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button 
          key="cancel" 
          onClick={handleCancel}
          onMouseEnter={handleMouseEnter} // Tambahkan handler untuk hover masuk
          onMouseLeave={handleMouseLeave} // Tambahkan handler untuk hover keluar
        >
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk} style={{ backgroundColor: '#543310', borderColor: '#543310' }}>
          OK
        </Button>,
      ]}
      centered
    >
      <div ref={modalRef}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <label style={{ marginBottom: '4px' }}>email : {userEmail}</label>
          <label>status :</label>
        </div>
        <Select
          value={statusUser}
          onChange={setStatusUser}
          onMouseEnter={() => setStatusUser(initialStatusUser)}
          onMouseLeave={() => setStatusUser(initialStatusUser)}
          style={{
            width: '100%',
            marginTop: '8px',
            borderColor: '#543310',
            boxShadow: '0 0 5px rgba(84, 51, 16, 0.5)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {statusOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              style={{
                backgroundColor: hoveredOption === option.value ? '#f0f0f0' : 'white',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={() => setHoveredOption(option.value)} // Set hovered option
              onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
            >
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
}
