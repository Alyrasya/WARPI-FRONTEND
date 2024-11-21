import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  account?: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onReset,
  account,
}) => {
  return (
    <Modal
      title={
        <div style={styles.title}>
          <ExclamationCircleOutlined style={styles.titleIcon} />
          Reset Password Confirmation
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="reset"
          type="primary"
          onClick={onReset}
        >
          Reset
        </Button>,
      ]}
      centered
      bodyStyle={styles.body}
    >
      <div style={styles.contentWrapper}>
        <ExclamationCircleOutlined style={styles.icon} />
        <div>
          <p style={styles.text}>
            Are you sure you want to reset the password for account ID{' '}
            <strong>{account}</strong>?
          </p>
          <p style={styles.subText}>
            This action will reset the password to the default value.
          </p>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  title: {
    textAlign: 'center' as const,
    color: '#d32f2f',
  },
  titleIcon: {
    fontSize: '28px',
    marginRight: '8px',
  },
  body: {
    padding: '24px',
    background: 'linear-gradient(135deg, #f9f9f9, #ffffff)',
    borderRadius: '8px',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  icon: {
    color: '#d32f2f',
    fontSize: '32px',
    animation: 'pulse 1.5s infinite',
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
  }
};

export default ResetPasswordModal;
