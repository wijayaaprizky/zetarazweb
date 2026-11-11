'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'success' | 'danger';
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'primary',
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const colorStyles = {
    primary: 'bg-brand-navy hover:bg-slate-900 text-white',
    success: 'bg-teal-600 hover:bg-teal-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const iconStyles = {
    primary: <CheckCircle2 className="w-6 h-6 text-brand-navy" />,
    success: <CheckCircle2 className="w-6 h-6 text-teal-600" />,
    danger: <AlertTriangle className="w-6 h-6 text-red-600" />,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">
            {iconStyles[variant]}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              {title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 ${colorStyles[variant]}`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
