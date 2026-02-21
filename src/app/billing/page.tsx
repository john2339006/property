"use client";

import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import DataTable from "@/components/DataTable";
import FeeOverrideModal from "@/components/FeeOverrideModal";
import Link from "next/link";
import { useState } from "react";

export default function BillingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<{
    amount: number;
    house: string;
    period: string;
    type: string;
  } | null>(null);

  const handleOpenModal = (bill: {
    amount: number;
    house: string;
    period: string;
    type: string;
  }) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleConfirmOverride = (amount: number, reason: string) => {
    console.log("Override confirmed:", amount, reason);
    setIsModalOpen(false);
    // In real app, call API
  };

  const headers = [
    "",
    "房屋信息 / 户主",
    "账期",
    "收费项目",
    "应收金额",
    "优惠后金额",
    "状态",
    "操作人",
    "操作",
  ];

  return (
    <>
      <Header>
        <nav className="flex items-center text-sm font-medium text-text-secondary">
          <Link href="/" className="hover:text-text-main cursor-pointer">
            首页
          </Link>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">账单与发票</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight">
                账单总览
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                管理所有房源的财务账单与收支情况
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-2 text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-gray-800 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">
                  download
                </span>
                导出报表
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-hover transition-colors shadow-sm shadow-blue-500/30">
                <span className="material-symbols-outlined text-lg">add</span>
                新增账单
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="总应收金额"
              value="¥ 1,245,000"
              subValue=".00"
              icon="account_balance_wallet"
              trend="+12.5% 较上月"
              trendUp={true}
              iconColorClass="text-primary"
              iconBgClass="bg-primary/10"
            />
            <KPICard
              title="已收金额"
              value="¥ 850,000"
              subValue=".00"
              icon="check_circle"
              trend="+8.2% 较上月"
              trendUp={true}
              iconColorClass="text-success"
              iconBgClass="bg-green-50 dark:bg-green-900/20"
            />
            <KPICard
              title="待收金额"
              value="¥ 395,000"
              subValue=".00"
              icon="pending"
              trend="+5.0% 待催缴"
              trendUp={false} // Warning
              iconColorClass="text-warning"
              iconBgClass="bg-amber-50 dark:bg-amber-900/20"
            />
            <KPICard
              title="优惠金额"
              value="¥ 25,000"
              subValue=".00"
              icon="percent"
              trend="-2.1% 较上月"
              trendUp={false} // Good? Less discount? Or bad? Let's say good trend is usually green.
              // Assuming less discount is good for revenue, but context depends. Screen says red (down).
              iconColorClass="text-danger" // Using danger color for icon as per screen
              iconBgClass="bg-red-50 dark:bg-red-900/20"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Date Filter */}
                <div className="relative group">
                  <button className="flex h-10 items-center justify-between gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2 text-sm text-text-main dark:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-text-secondary text-lg">
                        calendar_month
                      </span>
                      <span>2023年 10月</span>
                    </div>
                    <span className="material-symbols-outlined text-text-secondary text-lg">
                      expand_more
                    </span>
                  </button>
                </div>
                {/* Billing Type */}
                <div className="relative">
                  <button className="flex h-10 items-center justify-between gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2 text-sm text-text-main dark:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]">
                    <span>全部项目</span>
                    <span className="material-symbols-outlined text-text-secondary text-lg">
                      expand_more
                    </span>
                  </button>
                </div>
                {/* Status Filter */}
                <div className="flex bg-background-light dark:bg-gray-800 p-1 rounded-lg h-10">
                  <button className="px-3 rounded-md bg-surface-light dark:bg-surface-dark shadow-sm text-sm font-medium text-text-main dark:text-white transition-all">
                    全部
                  </button>
                  <button className="px-3 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                    待发
                  </button>
                  <button className="px-3 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                    已发
                  </button>
                  <button className="px-3 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                    已付
                  </button>
                  <button className="px-3 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                    作废
                  </button>
                </div>
              </div>
              {/* Search */}
              <div className="relative w-full md:w-auto md:min-w-[280px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-lg">
                  search
                </span>
                <input
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-main dark:text-white placeholder:text-text-secondary transition-colors"
                  placeholder="搜索房号、户主姓名..."
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <DataTable headers={headers}>
            {/* Row 1 */}
            <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors group">
              <td className="px-6 py-4 text-center">
                <input
                  type="checkbox"
                  className="rounded border-border-light text-primary focus:ring-primary/20 size-4"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-text-main dark:text-white">
                    A-1205 (Sunny Garden)
                  </span>
                  <span className="text-xs text-text-secondary">
                    张伟 (Zhang Wei)
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-text-secondary">2023-10</td>
              <td className="px-6 py-4 text-text-secondary">物业管理费</td>
              <td className="px-6 py-4 text-right text-text-secondary line-through">
                ¥ 5,000.00
              </td>
              <td className="px-6 py-4 text-right font-bold text-text-main dark:text-white">
                ¥ 4,800.00
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  待支付
                </span>
              </td>
              <td className="px-6 py-4 text-text-secondary">Admin_Wang</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() =>
                      handleOpenModal({
                        amount: 4800,
                        house: "A-1205 (Sunny Garden)",
                        period: "2023-10",
                        type: "物业管理费",
                      })
                    }
                    className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                  >
                    调价
                  </button>
                  <button className="text-xs font-medium text-text-secondary hover:text-text-main transition-colors">
                    详情
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors group">
              <td className="px-6 py-4 text-center">
                <input
                  type="checkbox"
                  className="rounded border-border-light text-primary focus:ring-primary/20 size-4"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-text-main dark:text-white">
                    B-0902 (Lakeview)
                  </span>
                  <span className="text-xs text-text-secondary">
                    李娜 (Li Na)
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-text-secondary">2023-10</td>
              <td className="px-6 py-4 text-text-secondary">车位费</td>
              <td className="px-6 py-4 text-right text-text-secondary">
                ¥ 800.00
              </td>
              <td className="px-6 py-4 text-right font-bold text-text-main dark:text-white">
                ¥ 800.00
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  已支付
                </span>
              </td>
              <td className="px-6 py-4 text-text-secondary">System_Auto</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-medium text-text-secondary cursor-not-allowed">
                    调价
                  </button>
                  <button className="text-xs font-medium text-text-secondary hover:text-text-main transition-colors">
                    详情
                  </button>
                </div>
              </td>
            </tr>
          </DataTable>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark rounded-b-xl border-x border-b">
            <p className="text-sm text-text-secondary">
              显示第 <span className="font-medium">1</span> 到{" "}
              <span className="font-medium">5</span> 条，共{" "}
              <span className="font-medium">128</span> 条结果
            </p>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2 text-sm font-medium text-text-secondary hover:bg-background-light dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                disabled
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
                上一页
              </button>
              <button className="inline-flex items-center justify-center gap-1 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3 py-2 text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                下一页
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <FeeOverrideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOverride}
        currentAmount={selectedBill?.amount || 0}
        houseName={selectedBill?.house || ""}
        period={selectedBill?.period || ""}
        feeType={selectedBill?.type || ""}
      />
    </>
  );
}
