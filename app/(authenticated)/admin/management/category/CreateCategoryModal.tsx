"use client"; // Pastikan ini adalah client component
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

export default function CreateCategoryModal({ isOpen, onClose, onSubmit }: CreateCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState<string>(''); // State untuk warna border
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false); // State untuk fokus input
  const [isInputHovered, setIsInputHovered] = useState<boolean>(false); // State untuk hover input
  const modalRef = useRef<HTMLDivElement>(null); // Ref untuk modal

  const handleOk = () => {
    if (categoryName.trim()) {
      onSubmit(categoryName);
      setCategoryName(''); // Reset input
      onClose(); // Tutup modal setelah submit
    }
  };

  const handleCancel = () => {
    setCategoryName(''); // Reset input saat modal ditutup
    onClose();
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

  // Event handler untuk mengubah warna border dan shadow input saat di-hover
  const handleInputMouseEnter = () => {
    if (!isInputFocused) {
      setInputBorderColor('#543310'); // Mengubah border-color saat hover jika tidak fokus
      setIsInputHovered(true); // Tandai input sebagai di-hover
    }
  };

  const handleInputMouseLeave = () => {
    if (!isInputFocused) {
      setInputBorderColor(''); // Menghapus perubahan border-color saat hover keluar jika tidak fokus
      setIsInputHovered(false); // Tandai input tidak lagi di-hover
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true); // Menandakan input sedang fokus
    setInputBorderColor('#543310'); // Mengubah border-color saat fokus
  };

  const handleInputBlur = () => {
    setIsInputFocused(false); // Menandakan input tidak lagi fokus
    if (!categoryName.trim()) {
      setInputBorderColor(''); // Menghapus perubahan border-color jika input kosong saat blur
    }
  };

  // Event handler untuk menangani klik di luar modal
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      // Hanya hilangkan shadow jika klik di luar modal
      setInputBorderColor('');
      setIsInputFocused(false);
      setIsInputHovered(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Tambahkan event listener saat modal terbuka
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Hapus event listener saat modal ditutup
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Hapus event listener saat komponen unmounted
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Modal
      title="Create Category"
      open={isOpen} // Gunakan 'open' daripada 'visible'
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
      style={{ padding: '20px' }}
    >
      <div ref={modalRef}> {/* Tempatkan ref di div pembungkus */}
        <label>Category Name</label>
        <Input
          placeholder="category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onMouseEnter={handleInputMouseEnter} // Tambahkan handler untuk hover input
          onMouseLeave={handleInputMouseLeave} // Tambahkan handler untuk hover keluar input
          onFocus={handleInputFocus} // Tambahkan handler saat input fokus
          onBlur={handleInputBlur} // Tambahkan handler saat input blur
          style={{ 
            marginTop: '8px', 
            padding: '8px',
            borderColor: inputBorderColor, // Mengatur warna border dari state
            boxShadow: isInputFocused || isInputHovered ? '0 0 5px #543310' : 'none', // Bayangan saat fokus atau hover
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease' // Tambahkan efek transisi
          }}
        />
      </div>
    </Modal>
  );
}