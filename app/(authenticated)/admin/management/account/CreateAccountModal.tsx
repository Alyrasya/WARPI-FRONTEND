"use client"; // Pastikan ini adalah client component
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, email: string) => void;
}

export default function CreateAccountModal({ isOpen, onClose, onSubmit }: CreateAccountModalProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // State untuk email
  const [usernameHover, setUsernameHover] = useState<boolean>(false); // State untuk hover username
  const [emailHover, setEmailHover] = useState<boolean>(false); // State untuk hover email
  const [activeInput, setActiveInput] = useState<'username' | 'email' | null>(null); // State untuk input yang aktif
  const modalRef = useRef<HTMLDivElement>(null); // Ref untuk modal

  const handleOk = () => {
    if (username.trim() && email.trim()) {
      onSubmit(username, email); // Pass both username and email
      setUsername(''); // Reset input
      setEmail(''); // Reset email input
      onClose(); // Tutup modal setelah submit
    }
  };

  const handleCancel = () => {
    setUsername(''); // Reset input saat modal ditutup
    setEmail(''); // Reset email saat modal ditutup
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

  const handleUsernameMouseEnter = () => {
    // Jika username tidak aktif, aktifkan hover efek
    if (activeInput !== 'username') {
      setUsernameHover(true);
    } else {
      setUsernameHover(false); // Reset hover jika aktif
    }
  };

  const handleUsernameMouseLeave = () => {
    setUsernameHover(false); // Hilangkan efek hover saat mouse keluar
  };

  const handleUsernameClick = () => {
    // Set username sebagai input aktif dan hilangkan hover efek
    setActiveInput('username');
    setEmailHover(false); // Nonaktifkan hover email jika username diklik
  };

  const handleEmailMouseEnter = () => {
    // Jika email tidak aktif, aktifkan hover efek
    if (activeInput !== 'email') {
      setEmailHover(true);
    } else {
      setEmailHover(false); // Reset hover jika aktif
    }
  };

  const handleEmailMouseLeave = () => {
    setEmailHover(false); // Hilangkan efek hover saat mouse keluar
  };

  const handleEmailClick = () => {
    // Set email sebagai input aktif dan hilangkan hover efek
    setActiveInput('email');
    setUsernameHover(false); // Nonaktifkan hover username jika email diklik
  };

  const handleInputBlur = () => {
    setActiveInput(null); // Reset aktif input saat blur
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // Jika klik di luar modal atau input, reset aktif input
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setActiveInput(null);
    }
  };

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

  // Mengubah border dan shadow berdasarkan status hover atau aktif
  const usernameBorderColor = activeInput === 'username' ? '#543310' : (usernameHover ? '#543310' : '');
  const emailBorderColor = activeInput === 'email' ? '#543310' : (emailHover ? '#543310' : '');

  // Menambahkan efek box shadow saat hover atau aktif
  const usernameBoxShadow = activeInput === 'username' ? '0 0 5px #543310' : (usernameHover ? '0 0 5px #543310' : 'none');
  const emailBoxShadow = activeInput === 'email' ? '0 0 5px #543310' : (emailHover ? '0 0 5px #543310' : 'none');

  return (
    <Modal
      title="Create Account"
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
      style={{ padding: '20px' }}
    >
      <div ref={modalRef}>
        <label>Username</label>
        <Input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onMouseEnter={handleUsernameMouseEnter}
          onMouseLeave={handleUsernameMouseLeave}
          onClick={handleUsernameClick} // Set active input saat klik
          onBlur={handleInputBlur}
          style={{
            marginTop: '8px',
            padding: '8px',
            borderColor: usernameBorderColor,
            boxShadow: usernameBoxShadow,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        />
        <label style={{ marginTop: '16px' }}>Email</label>
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onMouseEnter={handleEmailMouseEnter}
          onMouseLeave={handleEmailMouseLeave}
          onClick={handleEmailClick} // Set active input saat klik
          onBlur={handleInputBlur}
          style={{
            marginTop: '8px',
            padding: '8px',
            borderColor: emailBorderColor,
            boxShadow: emailBoxShadow,
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        />
      </div>
    </Modal>
  );
}
