import React, { useEffect, useState, useCallback } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'error' | 'success' | 'info';
  duration?: number;
}

export const Toast = ({ message, isVisible, onClose, type = 'error', duration = 2000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      console.log('Toast shown, setting timer for', duration, 'ms');
      const timer = setTimeout(() => {
        console.log('Toast timer expired, closing');
        onClose();
      }, duration);
      return () => {
        console.log('Toast timer cleared');
        clearTimeout(timer);
      };
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const bgColor = {
    error: 'bg-red-600/80',
    success: 'bg-green-600/80',
    info: 'bg-blue-600/80'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className={`${bgColor[type]} text-white px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 pointer-events-auto`}>
        <p className="text-sm font-medium text-center">{message}</p>
      </div>
    </div>
  );
};