"use client"; // Ensure this is a client component
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
  onSubmit: (statusUser: string) => void; // Function to submit the updated status
  userEmail: string; // Display the user's email
  initialStatusUser: string; // Initial status of the user
  accountId: string; // Account ID to pass along with the update
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
  accountId,
}: EditAccountModalProps) {
  const [statusUser, setStatusUser] = useState<string>(initialStatusUser);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null); // For hover effect
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [statusHover, setStatusHover] = useState<boolean>(false);

  // Handle OK button click, which submits the selected status
  const handleOk = () => {
    if (statusUser !== initialStatusUser) {
      onSubmit(statusUser); // Send the selected status back to the parent component
    }
    onClose();
    router.refresh(); // Refresh the page (optional, if needed)
  };

  const handleCancel = () => {
    setStatusUser(initialStatusUser); // Reset to initial value if cancelled
    onClose();
    router.refresh(); // Refresh the page (optional)
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
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: '#543310', borderColor: '#543310' }}
        >
          OK
        </Button>,
      ]}
      centered
    >
      <div ref={modalRef}>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <label style={{ marginBottom: '4px' }}>Email: {userEmail}</label>
          <label style={{ marginBottom: '8px' }}>Status:</label>
        </div>
        <Select
          value={statusUser} // Set the current status
          onChange={setStatusUser} // Update the status when an option is selected
          onMouseEnter={() => setStatusHover(true)}
          onMouseLeave={() => setStatusHover(false)}
          style={{
            width: '100%',
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
