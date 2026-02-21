"use client";

import { useState } from "react";

interface FeeOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, reason: string) => void;
  currentAmount: number;
  houseName: string;
  period: string;
  feeType: string;
}

export default function FeeOverrideModal({
  isOpen,
  onClose,
  onConfirm,
  currentAmount,
  houseName,
  period,
  feeType,
}: FeeOverrideModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      role="dialog"
    >
      <div className="bg-surface-light dark:bg-surface-dark w-full max-w-[600px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">
                edit_document
              </span>
            </span>
            <div>
              <h3 className="text-xl font-bold text-text-main dark:text-white leading-tight">
                费用调价
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Adjust Fee Amount
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-main transition-colors p-2 rounded-full hover:bg-background-light dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
          {/* Context Section */}
          <div className="bg-background-light dark:bg-gray-800/50 rounded-lg p-4 border border-border-light dark:border-border-dark mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                  房屋资源
                </span>
                <span className="font-semibold text-text-main dark:text-white truncate">
                  {houseName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                  账期
                </span>
                <span className="font-semibold text-text-main dark:text-white">
                  {period}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                  收费项目
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">
                    receipt_long
                  </span>
                  <span className="font-semibold text-primary">{feeType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                当前应收金额
              </label>
              <div className="flex h-12 items-center px-4 rounded-lg bg-background-light dark:bg-gray-900 border border-border-light dark:border-border-dark text-text-secondary select-none">
                <span className="text-lg font-bold">
                  ¥ {currentAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-medium text-text-main dark:text-white">
                调整后金额
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-text-main dark:text-white font-bold text-lg">
                  ¥
                </span>
                <input
                  autoFocus
                  className="w-full h-12 pl-10 pr-4 rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-lg font-bold text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:font-normal placeholder:text-text-secondary transition-all shadow-sm"
                  placeholder="0.00"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-2 mb-2">
            <label className="flex justify-between text-sm font-medium text-text-main dark:text-white">
              <span>
                调整原因 <span className="text-danger text-base leading-none ml-0.5">*</span>
              </span>
            </label>
            <textarea
              className="w-full rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px] p-4 text-sm leading-relaxed placeholder:text-text-secondary resize-none shadow-sm"
              placeholder="请输入详细的调整原因..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Hint */}
          <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">
              info
            </span>
            <div className="text-xs text-text-secondary leading-5">
              <span className="font-semibold text-primary block mb-0.5">
                审计提示
              </span>
              此操作将创建新的账单版本，所有的修改历史和操作人员将被记录在系统审计日志中。
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-background-light dark:bg-gray-800 border-t border-border-light dark:border-border-dark flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-secondary font-medium text-sm hover:bg-surface-light dark:hover:bg-gray-700 transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => onConfirm(parseFloat(amount), reason)}
            disabled={!amount || !reason}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[1.125rem]">
              check_circle
            </span>
            确认调整
          </button>
        </div>
      </div>
    </div>
  );
}
