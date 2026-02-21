"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import clsx from "clsx";

export default function AuditLogsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                    <Link href="/" className="text-text-secondary hover:text-primary transition-colors font-medium">首页</Link>
                    <span className="text-text-secondary font-medium material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-secondary font-medium">系统设置</span>
                    <span className="text-text-secondary font-medium material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-semibold">审计日志</span>
                </div>
            </Header>

            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark custom-scrollbar">
                <div className="px-6 py-5 w-full max-w-[1600px] mx-auto flex flex-col h-full gap-4">

                    {/* Header */}
                    <div className="flex justify-between items-end shrink-0">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-text-main dark:text-white text-3xl font-extrabold tracking-tight">审计日志 Audit Log</h1>
                            <p className="text-text-secondary dark:text-gray-400 text-sm">全平台数据变更追踪系统，保障数据安全与合规透明 System-wide data mutation tracking.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-gray-700 text-text-main dark:text-gray-200 text-sm font-medium transition-colors">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                导出 CSV
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 shadow-sm shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">操作时间 Time Range</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-secondary text-[20px]">calendar_today</span>
                                    <input className="w-full pl-10 pr-3 py-2 bg-background-light dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 font-mono outline-none" placeholder="2023-10-01 - 2023-10-27" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">操作人 Operator</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-secondary text-[20px]">search</span>
                                    <input className="w-full pl-10 pr-3 py-2 bg-background-light dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 outline-none" placeholder="请输入姓名或ID" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">模块 Module</label>
                                <div className="relative">
                                    <select className="w-full pl-3 pr-10 py-2 bg-background-light dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none outline-none cursor-pointer">
                                        <option value="">全部模块 All Modules</option>
                                        <option value="billing">账单管理 Billing</option>
                                        <option value="property">房产资源 Property</option>
                                        <option value="owner">业主档案 Owner</option>
                                        <option value="system">系统配置 System</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-text-secondary pointer-events-none text-[20px]">expand_more</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">操作类型 Type</label>
                                <div className="relative">
                                    <select className="w-full pl-3 pr-10 py-2 bg-background-light dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none outline-none cursor-pointer">
                                        <option value="">全部类型 All Types</option>
                                        <option value="create">新增 Create</option>
                                        <option value="update">修改 Update</option>
                                        <option value="delete">删除 Delete</option>
                                        <option value="price">调价 Adjust Price</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-text-secondary pointer-events-none text-[20px]">expand_more</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 h-[38px] bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg shadow-sm shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                    筛选 Search
                                </button>
                                <button className="w-[38px] h-[38px] bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-700 text-text-secondary rounded-lg flex items-center justify-center transition-colors" title="重置 Reset">
                                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table Container */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col flex-1 min-h-[400px]">
                        <div className="overflow-auto custom-scrollbar flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-background-light dark:bg-gray-900/50 sticky top-0 z-10">
                                    <tr>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark whitespace-nowrap">时间 Timestamp</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark whitespace-nowrap">操作人 Operator</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark whitespace-nowrap">模块 Module</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark whitespace-nowrap">类型 Type</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark w-full">操作内容 Details</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark whitespace-nowrap">IP地址</th>
                                        <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light dark:border-border-dark text-right whitespace-nowrap">变更 Diff</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark/50 text-sm">
                                    {/* Row 1 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-text-secondary dark:text-gray-300">2023-10-27 14:30:05</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">张</div>
                                                <span className="font-medium text-text-main dark:text-gray-100">张三</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-background-light text-text-secondary dark:bg-gray-700 dark:text-gray-300 border border-border-light dark:border-gray-600">财务</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap text-text-secondary dark:text-gray-300">账单管理</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50">
                                                <span className="size-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                                                修改
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 dark:text-gray-200">
                                            修改了账单 <span className="font-mono text-primary bg-primary-light dark:bg-primary/10 px-1 rounded cursor-pointer hover:underline">H-20231001</span> 的金额
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-text-secondary dark:text-gray-400">192.168.1.45</td>
                                        <td className="py-3 px-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-primary-light dark:hover:bg-primary/10"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">difference</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-gray-700/30 transition-colors bg-background-light/50 dark:bg-gray-800/50">
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-text-secondary dark:text-gray-300">2023-10-27 14:28:12</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">李</div>
                                                <span className="font-medium text-text-main dark:text-gray-100">李四</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-background-light text-text-secondary dark:bg-gray-700 dark:text-gray-300 border border-border-light dark:border-gray-600">管理员</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap text-text-secondary dark:text-gray-300">业主档案</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200/50">
                                                <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                                新增
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 dark:text-gray-200">
                                            录入新业主 <span className="font-mono text-text-main dark:text-white font-medium">王五 (10-201)</span>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-text-secondary dark:text-gray-400">192.168.1.45</td>
                                        <td className="py-3 px-4 whitespace-nowrap text-right">
                                            <button className="text-text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-primary-light dark:hover:bg-primary/10">
                                                <span className="material-symbols-outlined text-[20px]">difference</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-text-secondary dark:text-gray-300">2023-10-27 13:15:44</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">张</div>
                                                <span className="font-medium text-text-main dark:text-gray-100">张三</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-background-light text-text-secondary dark:bg-gray-700 dark:text-gray-300 border border-border-light dark:border-gray-600">财务</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap text-text-secondary dark:text-gray-300">费用配置</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/50">
                                                <span className="size-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                                                删除
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 dark:text-gray-200">
                                            删除了过期收费标准 <span className="font-mono text-text-main dark:text-white font-medium">2021-物业费</span>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-text-secondary dark:text-gray-400">192.168.1.45</td>
                                        <td className="py-3 px-4 whitespace-nowrap text-right">
                                            <button className="text-text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-primary-light dark:hover:bg-primary/10">
                                                <span className="material-symbols-outlined text-[20px]">difference</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-gray-700/30 transition-colors bg-background-light/50 dark:bg-gray-800/50">
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-text-secondary dark:text-gray-300">2023-10-27 11:05:30</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">Sys</div>
                                                <span className="font-medium text-text-main dark:text-gray-100">系统自动</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-background-light text-text-secondary dark:bg-gray-700 dark:text-gray-300 border border-border-light dark:border-gray-600">Bot</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap text-text-secondary dark:text-gray-300">账单管理</td>
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                                                <span className="size-1.5 rounded-full bg-indigo-500 mr-1.5"></span>
                                                调价
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 dark:text-gray-200">
                                            批量生成 <span className="font-bold text-text-main dark:text-gray-100">10月账单</span>，共计 204 条记录
                                        </td>
                                        <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-text-secondary dark:text-gray-400">127.0.0.1</td>
                                        <td className="py-3 px-4 whitespace-nowrap text-right">
                                            <button className="text-text-secondary hover:text-primary transition-colors p-1 rounded hover:bg-primary-light dark:hover:bg-primary/10">
                                                <span className="material-symbols-outlined text-[20px]">difference</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark px-4 py-3 bg-surface-light dark:bg-surface-dark shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary dark:text-gray-400">显示第</span>
                                <select className="form-select py-1 pl-2 pr-8 text-sm border-border-light dark:border-border-dark rounded bg-background-light dark:bg-gray-900 focus:border-primary focus:ring-0 outline-none">
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                                <span className="text-sm text-text-secondary dark:text-gray-400">条 / 页，共 5032 条记录</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-1 rounded text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-background-light dark:hover:bg-gray-700 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-[20px]">first_page</span>
                                </button>
                                <button className="p-1 rounded text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-background-light dark:hover:bg-gray-700 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <div className="flex items-center gap-1 mx-2">
                                    <button className="size-8 flex items-center justify-center rounded text-sm font-medium bg-primary text-white shadow-sm">1</button>
                                    <button className="size-8 flex items-center justify-center rounded text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-background-light dark:hover:bg-gray-700 transition-colors">2</button>
                                    <button className="size-8 flex items-center justify-center rounded text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-background-light dark:hover:bg-gray-700 transition-colors">3</button>
                                    <span className="text-text-secondary px-1">...</span>
                                    <button className="size-8 flex items-center justify-center rounded text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-background-light dark:hover:bg-gray-700 transition-colors">51</button>
                                </div>
                                <button className="p-1 rounded text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-background-light dark:hover:bg-gray-700">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                                <button className="p-1 rounded text-text-secondary hover:text-text-main dark:hover:text-white hover:bg-background-light dark:hover:bg-gray-700">
                                    <span className="material-symbols-outlined text-[20px]">last_page</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-[2px]"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark w-full max-w-4xl max-h-[80vh] flex flex-col pointer-events-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                    <span className="material-symbols-outlined">edit_document</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight">变更详情 Change Details</h3>
                                    <p className="text-xs text-text-secondary">Log ID: #99283120 • 2023-10-27 14:30:05</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-text-secondary hover:text-text-main dark:hover:text-gray-300 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto bg-background-light/50 dark:bg-gray-900/50 custom-scrollbar">
                            <div className="grid grid-cols-2 gap-0 border border-border-light dark:border-border-dark rounded-lg overflow-hidden text-sm font-mono">
                                {/* Header */}
                                <div className="bg-red-50/50 dark:bg-red-900/20 p-3 border-b border-r border-border-light dark:border-border-dark text-red-700 dark:text-red-400 font-bold flex items-center gap-2 bg-[length:10px_10px] bg-[radial-gradient(var(--color-red-100)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--color-red-900)_1px,transparent_1px)]">
                                    <span className="material-symbols-outlined text-[16px]">remove_circle</span> 原始值 Old Value
                                </div>
                                <div className="bg-green-50/50 dark:bg-green-900/20 p-3 border-b border-border-light dark:border-border-dark text-green-700 dark:text-green-400 font-bold flex items-center gap-2 bg-[length:10px_10px] bg-[radial-gradient(var(--color-green-100)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--color-green-900)_1px,transparent_1px)]">
                                    <span className="material-symbols-outlined text-[16px]">add_circle</span> 新值 New Value
                                </div>

                                {/* Content Row 1: Amount Change */}
                                <div className="p-4 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark border-b border-border-light dark:border-gray-800">
                                    <div className="text-text-secondary text-xs mb-1">amount (金额)</div>
                                    <div className="bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 inline-block px-1 rounded line-through opacity-80">2400.00</div>
                                </div>
                                <div className="p-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-gray-800">
                                    <div className="text-text-secondary text-xs mb-1">amount (金额)</div>
                                    <div className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 inline-block px-1 rounded">2250.00</div>
                                </div>

                                {/* Content Row 2: Status (Unchanged) */}
                                <div className="p-4 bg-background-light dark:bg-gray-900 border-r border-border-light dark:border-border-dark opacity-60">
                                    <div className="text-text-secondary text-xs mb-1">status (状态)</div>
                                    <div className="text-text-secondary dark:text-gray-400">UNPAID</div>
                                </div>
                                <div className="p-4 bg-background-light dark:bg-gray-900 opacity-60">
                                    <div className="text-text-secondary text-xs mb-1">status (状态)</div>
                                    <div className="text-text-secondary dark:text-gray-400">UNPAID</div>
                                </div>

                                {/* Content Row 3: Remark Added */}
                                <div className="p-4 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark">
                                    <div className="text-text-secondary text-xs mb-1">remark (备注)</div>
                                    <div className="text-text-secondary dark:text-gray-400 italic">null</div>
                                </div>
                                <div className="p-4 bg-surface-light dark:bg-surface-dark">
                                    <div className="text-text-secondary text-xs mb-1">remark (备注)</div>
                                    <div className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 inline-block px-1 rounded">经协商减免物业费滞纳金</div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg text-text-secondary dark:text-gray-300 hover:bg-background-light dark:hover:bg-gray-700 border border-border-light dark:border-border-dark font-medium text-sm transition-colors"
                            >
                                关闭 Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
