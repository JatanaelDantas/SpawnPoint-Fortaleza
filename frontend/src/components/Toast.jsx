import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className={`toast-container ${type}`}>
      <span>{message}</span>
    </div>
  );
}