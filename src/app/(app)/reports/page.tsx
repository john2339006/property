"use client";

import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import Link from "next/link";
import { useState } from "react";

export default function ReportsPage() {
    const [dateFilter, setDateFilter] = useState("本月 (2023-11)");

    const financialKPIs = [
        {
            title: "本期应收总额",
            value: "¥1,245,000",
            trend: "+12.5%",
            trendLabel: "较上期",
            icon: "account_balance_wallet",
            color: "blue",
        },
        {
            title: "未结清账单",
            value: "142",
            trend: "-5.2%",
            trendLabel: "较上期",
            icon: "receipt_long",
            color: "red",
        },
        {
            title: "优惠减免总额",
            value: "¥25,000",
            trend: "-2.1%",
            trendLabel: "较上期",
            icon: "sell",
            color: "green",
        },
        {
            title: "当期收缴率",
            value: "85.2%",
            trend: "78.5%",
            trendLabel: "行业均值",
            icon: "trending_up",
            color: "yellow",
        },
    ];

    const recentActions = [
        {
            id: 1,
            user: "张三",
            action: "修改了 103 户的物业费标准",
            time: "10 分钟前",
            color: "bg-blue-500",
        },
        {
            id: 2,
            user: "系统",
            action: "自动生成了本月所有预收账单",
            time: "1 小时前",
            color: "bg-green-500",
        },
        {
            id: 3,
            user: "李四",
            action: "导出了 2023 财务年度报表",
            time: "3 小时前",
            color: "bg-purple-500",
        },
        {
            id: 4,
            user: "王五",
            action: "新增了 5 户新业主档案",
            time: "今天 10:24",
            color: "bg-orange-500",
        },
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
                    <span className="text-text-main font-bold">统计报表</span>
                </nav>
            </Header>

            <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                <div className="max-w-[1600px] mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-text-main dark:text-white">
                                统计报表总览
                            </h1>
                            <p className="text-sm text-text-secondary mt-1">
                                查看财务、房产和审计相关数据分析
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-gray-800 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">
                                    download
                                </span>
                                导出数据
                            </button>
                            <div className="relative">
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-500 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                >
                                    <option value="本月 (2023-11)">本月 (2023-11)</option>
                                    <option value="上月 (2023-10)">上月 (2023-10)</option>
                                    <option value="本季度">本季度</option>
                                    <option value="本年度">本年度</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none text-[20px]">
                                    expand_more
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {financialKPIs.map((kpi, index) => {
                            const trendUp =
                                kpi.trend.startsWith("+") ||
                                (!kpi.trend.startsWith("-") && kpi.color !== "red");

                            let bgClass = "bg-primary-light dark:bg-primary-dark/20";
                            let textClass = "text-primary dark:text-primary-light";

                            if (kpi.color === "red") {
                                bgClass = "bg-red-50 dark:bg-red-900/20";
                                textClass = "text-red-500";
                            } else if (kpi.color === "green") {
                                bgClass = "bg-green-50 dark:bg-green-900/20";
                                textClass = "text-green-500";
                            } else if (kpi.color === "yellow") {
                                bgClass = "bg-yellow-50 dark:bg-yellow-900/20";
                                textClass = "text-yellow-600 dark:text-yellow-500";
                            }

                            return (
                                <KPICard
                                    key={index}
                                    title={kpi.title}
                                    value={kpi.value}
                                    subValue={kpi.trendLabel}
                                    trend={kpi.trend}
                                    trendUp={trendUp}
                                    icon={kpi.icon}
                                    iconBgClass={bgClass}
                                    iconColorClass={textClass}
                                />
                            );
                        })}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                        {/* Revenue Trends */}
                        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-text-main dark:text-white">
                                    收入趋势分析
                                </h2>
                                <div className="flex bg-background-light dark:bg-gray-800 p-1 rounded-lg">
                                    <button className="px-3 py-1 bg-surface-light dark:bg-surface-dark rounded shadow-sm text-xs font-medium text-blue-600 dark:text-blue-400">
                                        近6个月
                                    </button>
                                    <button className="px-3 py-1 text-xs font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-colors">
                                        本年度
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg flex flex-col items-center justify-center bg-background-light dark:bg-background-dark/50">
                                <span className="material-symbols-outlined text-6xl text-text-secondary/40 mb-2">
                                    bar_chart
                                </span>
                                <p className="text-sm text-text-secondary">
                                    柱状图组件占位 (Bar Chart Placeholder)
                                </p>
                            </div>
                        </div>

                        {/* Property Status */}
                        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-text-main dark:text-white">
                                    房产状态分布
                                </h2>
                            </div>
                            <div className="flex-1 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg flex flex-col items-center justify-center bg-background-light dark:bg-background-dark/50">
                                <span className="material-symbols-outlined text-6xl text-text-secondary/40 mb-2">
                                    pie_chart
                                </span>
                                <p className="text-sm text-text-secondary">
                                    饼图组件占位 (Pie Chart Placeholder)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* High-frequency Modules (Audit) */}
                        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-text-main dark:text-white">
                                    高频变动模块 (审计日志)
                                </h2>
                                <Link
                                    href="/audit-logs"
                                    className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    查看全部
                                </Link>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                                            <span className="material-symbols-outlined">
                                                receipt_long
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-main dark:text-white">
                                                账单状态变更
                                            </p>
                                            <p className="text-xs text-text-secondary mt-0.5">
                                                涉及模块: 账单与发票
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-text-main dark:text-white">
                                            342
                                        </p>
                                        <p className="text-xs text-text-secondary">操作次数</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                            <span className="material-symbols-outlined">
                                                person_add
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-main dark:text-white">
                                                新增业主档案
                                            </p>
                                            <p className="text-xs text-text-secondary mt-0.5">
                                                涉及模块: 业主管理
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-text-main dark:text-white">
                                            128
                                        </p>
                                        <p className="text-xs text-text-secondary">操作次数</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                                            <span className="material-symbols-outlined">edit</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-main dark:text-white">
                                                费用标准修改
                                            </p>
                                            <p className="text-xs text-text-secondary mt-0.5">
                                                涉及模块: 费用配置
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-text-main dark:text-white">
                                            45
                                        </p>
                                        <p className="text-xs text-text-secondary">操作次数</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Actions */}
                        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-text-main dark:text-white">
                                    近期操作动态
                                </h2>
                            </div>
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-2 top-2 bottom-2 w-px bg-border-light dark:bg-border-dark"></div>

                                <div className="space-y-6">
                                    {recentActions.map((action) => (
                                        <div key={action.id} className="relative pl-8">
                                            {/* Timeline Dot */}
                                            <div
                                                className={`absolute left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${action.color} ring-4 ring-surface-light dark:ring-surface-dark`}
                                            ></div>
                                            <div>
                                                <p className="text-sm text-text-main dark:text-white">
                                                    <span className="font-medium">{action.user}</span>{" "}
                                                    {action.action}
                                                </p>
                                                <p className="text-xs text-text-secondary mt-1">
                                                    {action.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="w-full mt-6 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-secondary hover:text-text-main hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                                查看完整日志
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
