"use client"; // Ensure this is a client component
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
  onSubmit: (updatedData: { category_name?: string; status_category?: string }) => void;
  initialCategoryName: string;
  initialStatusCategory: string;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function EditCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialCategoryName,
  initialStatusCategory,
}: EditCategoryModalProps) {
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [statusCategory, setStatusCategory] = useState(initialStatusCategory);
  const [categoryNameHover, setCategoryNameHover] = useState<boolean>(false);
  const [statusHover, setStatusHover] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<'categoryName' | 'status' | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOk = () => {
    const updatedData: { category_name?: string; status_category?: string } = {}; // Explicit typing
    
    // Only include fields that have been changed
    if (categoryName.trim() && categoryName !== initialCategoryName) {
      updatedData.category_name = categoryName; // Correct key for category name
    }
    
    if (statusCategory && statusCategory !== initialStatusCategory) {
      updatedData.status_category = statusCategory; // Correct key for status category
    }
    
    // Pass the updated data to the onSubmit function
    if (Object.keys(updatedData).length > 0) {
      onSubmit(updatedData);
    } else {
      onClose(); // Close modal if no changes
    }
  };

  const handleCancel = () => {
    setCategoryName(initialCategoryName); // Reset to initial value
    setStatusCategory(initialStatusCategory); // Reset to initial value
    onClose();
    router.refresh();
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setActiveInput(null);
    }
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

  useEffect(() => {
    if (isOpen) {
      setCategoryName(initialCategoryName);
      setStatusCategory(initialStatusCategory);
    }
  }, [isOpen, initialCategoryName, initialStatusCategory]);


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Change border and shadow based on hover or active status
  const categoryNameBorderColor = activeInput === 'categoryName' ? '#543310' : (categoryNameHover ? '#543310' : '');
  const statusBorderColor = activeInput === 'status' ? '#543310' : (statusHover ? '#543310' : '');

  // Add box shadow effect on hover or active
  const categoryNameBoxShadow = activeInput === 'categoryName' ? '0 0 5px #543310' : (categoryNameHover ? '0 0 5px #543310' : 'none');
  const statusBoxShadow = activeInput === 'status' ? '0 0 5px #543310' : (statusHover ? '0 0 5px #543310' : 'none');

  return (
    <Modal
      title="Edit Category"
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
        <label>Category Name</label>
        <Input
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onMouseEnter={() => setCategoryNameHover(true)}
          onMouseLeave={() => setCategoryNameHover(false)}
          onClick={() => {
            setActiveInput('categoryName');
            setStatusHover(false);
          }}
          onBlur={handleInputBlur}
          style={{
            marginTop: '8px',
            padding: '8px',
            borderColor: categoryNameBorderColor,
            boxShadow: categoryNameBoxShadow,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        />
        <label style={{ marginTop: '16px' }}>Status Category</label>
        <Select
          value={statusCategory}
          onChange={setStatusCategory}
          onMouseEnter={() => setStatusHover(true)}
          onMouseLeave={() => setStatusHover(false)}
          onClick={() => {
            setActiveInput('status');
            setCategoryNameHover(false);
          }}
          onBlur={handleInputBlur}
          style={{
            width: '100%',
            marginTop: '8px',
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
