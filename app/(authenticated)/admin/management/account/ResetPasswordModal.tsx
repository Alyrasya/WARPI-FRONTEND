import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => Promise<void>; // Define the onReset prop to be a function
  accountId: string | null; // Keep accountId as string or null
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, onReset }) => {
  return (
    <Modal
      title={
        <div style={{ textAlign: 'center', color: '#d32f2f' }}>
          <ExclamationCircleOutlined style={{ fontSize: '28px', marginRight: '8px' }} />
          Reset Password Confirmation
        </div>
      }
      open={isOpen}
      onOk={onReset} // Call onReset when OK is clicked
      onCancel={onClose}
      footer={[
        <Button 
          key="cancel" 
          onClick={onClose}
          style={styles.cancelButton}
          onMouseEnter={handleMouseEnter} // Add hover effect for mouse enter
          onMouseLeave={handleMouseLeave} // Add hover effect for mouse leave
        >
          Cancel
        </Button>,
        <Button
          key="reset"
          type="primary"
          onClick={onReset} // Call onReset when Reset is clicked
          style={styles.confirmButton}
        >
          Reset
        </Button>,
      ]}
      centered
      style={styles.modal}
      bodyStyle={styles.modalBody}
    >
      <div style={styles.contentWrapper}>
        <ExclamationCircleOutlined style={styles.icon} />
        <div>
          <p style={styles.text}>Are you sure you want to reset this account password?</p>
          <p style={styles.subText}>This action will reset the password to the default value.</p>
        </div>
      </div>
    </Modal>
  );
};

// Hover effect handlers
const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.borderColor = 'red'; // Change border color on hover
  e.currentTarget.style.color = 'red'; // Change text color on hover
};

const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.borderColor = ''; // Reset border color
  e.currentTarget.style.color = ''; // Reset text color
};

const styles = {
  modal: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    padding: '24px',
    backgroundColor: '#f9f9f9',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  icon: {
    color: '#d32f2f',
    fontSize: '32px',
    animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden' as 'hidden' | 'visible',
    perspective: '1000px',
  },
  text: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#333',
  },
  subText: {
    fontSize: '14px',
    color: '#555',
  },
  cancelButton: {
    backgroundColor: 'transparent', // Same as EditAccountModal
    color: '#f44336', // Text color
    border: '1px solid #f44336', // Border color to match
    borderRadius: '8px',
    height: '35px',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease', // Smooth transitions
  },
  confirmButton: {
    backgroundColor: '#543310',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    height: '35px',
    transition: 'background-color 0.3s ease', // Smooth transitions
  },
};

export default ResetPasswordModal;
