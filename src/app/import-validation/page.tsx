"use client";

import Header from "@/components/Header";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";

export default function ImportValidationPage() {
    const [activeTab, setActiveTab] = useState("error");

    return (
        <>
            <Header>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                    <Link href="/" className="text-text-secondary hover:text-primary transition-colors font-medium">首页</Link>
                    <span className="text-text-secondary font-medium material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-secondary font-medium">系统设置</span>
                    <span className="text-text-secondary font-medium material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-secondary font-medium">数据导入</span>
                    <span className="text-text-secondary font-medium material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-semibold">校验结果</span>
                </div>
            </Header>

            <div className="flex-1 flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark custom-scrollbar relative">
                <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-8 pb-32">

                    {/* Stepper */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-2xl font-bold text-text-main dark:text-white">批量导入房产数据</h1>
                            <span className="text-sm font-medium text-text-secondary">步骤 3 / 4</span>
                        </div>
                        <div className="relative w-full h-2 bg-border-light dark:bg-border-dark rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary w-3/4 duration-500 transition-all"></div>
                        </div>
                        <div className="flex justify-between mt-3 text-sm font-medium text-text-secondary dark:text-gray-400">
                            <span className="text-primary hidden sm:block">1. 上传文件</span>
                            <span className="text-primary hidden sm:block">2. 字段映射</span>
                            <span className="text-primary font-bold">3. 数据预览与校验</span>
                            <span>4. 完成导入</span>
                        </div>
                    </div>

                    {/* Summary Alert: Error State */}
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center shrink-0 text-red-600 dark:text-red-200">
                                <span className="material-symbols-outlined text-[24px]">error</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-1">校验失败：发现 3 条错误数据</h3>
                                <p className="text-red-600 dark:text-red-300 text-sm">请直接在下方表格中修改错误数据，或者下载错误报告修正后重新上传。</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 shrink-0">
                            <button className="px-4 py-2 bg-surface-light dark:bg-surface-dark border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                导出错误清单
                            </button>
                            <button className="px-4 py-2 bg-danger hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                重新上传文件
                            </button>
                        </div>
                    </div>

                    {/* Data Grid Container */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col overflow-hidden">

                        {/* Filter Tabs */}
                        <div className="border-b border-border-light dark:border-border-dark px-6 pt-4 flex gap-8 overflow-x-auto custom-scrollbar">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={clsx(
                                    "pb-3 border-b-2 font-medium text-sm flex gap-2 items-center whitespace-nowrap transition-colors",
                                    activeTab === 'all'
                                        ? "border-primary text-primary"
                                        : "border-transparent text-text-secondary hover:text-text-main dark:hover:text-gray-200"
                                )}
                            >
                                全部数据
                                <span className="bg-background-light dark:bg-gray-700 text-text-secondary dark:text-gray-300 text-xs py-0.5 px-2 rounded-full">155</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('error')}
                                className={clsx(
                                    "pb-3 border-b-2 font-bold text-sm flex gap-2 items-center whitespace-nowrap transition-colors",
                                    activeTab === 'error'
                                        ? "border-danger text-danger"
                                        : "border-transparent text-text-secondary hover:text-text-main dark:hover:text-gray-200"
                                )}
                            >
                                错误数据
                                <span className="bg-red-100 dark:bg-red-900/40 text-danger dark:text-red-400 text-xs py-0.5 px-2 rounded-full">3</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('success')}
                                className={clsx(
                                    "pb-3 border-b-2 font-medium text-sm flex gap-2 items-center whitespace-nowrap transition-colors",
                                    activeTab === 'success'
                                        ? "border-success text-success"
                                        : "border-transparent text-text-secondary hover:text-text-main dark:hover:text-gray-200"
                                )}
                            >
                                成功数据
                                <span className="bg-green-100 dark:bg-green-900/40 text-success dark:text-green-400 text-xs py-0.5 px-2 rounded-full">152</span>
                            </button>
                        </div>

                        {/* Table Actions */}
                        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-background-light/50 dark:bg-gray-800/50">
                            <div className="text-sm text-text-secondary dark:text-gray-400">
                                <span className="material-symbols-outlined align-middle text-[18px] mr-1">info</span>
                                直接在红色边框的输入框中修改错误数据。
                            </div>
                            <div className="flex gap-2">
                                <div className="relative w-full sm:w-auto">
                                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-text-secondary text-[18px]">search</span>
                                    <input
                                        className="pl-9 pr-4 py-1.5 text-sm border border-border-light dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-text-main dark:text-white w-full sm:w-64 placeholder:text-gray-400"
                                        placeholder="搜索房号或业主..."
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-background-light dark:bg-gray-900/50 border-b border-border-light dark:border-border-dark">
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-20">状态</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-32">房号</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-32">面积 (㎡)</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-40">业主姓名</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-40">手机号</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">错误详情</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-24 text-right">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark bg-surface-light dark:bg-surface-dark">

                                    {/* Row 1: Error (Area Format) */}
                                    {(activeTab === 'all' || activeTab === 'error') && (
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-danger text-[20px]" title="校验失败">warning</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-gray-100">1-101</td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <input
                                                        className="w-full px-2 py-1 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all placeholder:text-red-300"
                                                        type="text"
                                                        defaultValue="120 sqm"
                                                    />
                                                    <span className="material-symbols-outlined absolute right-2 top-1.5 text-danger text-[14px] pointer-events-none">edit</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">张三</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">13800138000</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                                                    面积格式错误 (应为数字)
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-secondary hover:text-danger transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-gray-700">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Row 2: Error (Duplicate ID) */}
                                    {(activeTab === 'all' || activeTab === 'error') && (
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-danger text-[20px]" title="校验失败">warning</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-gray-100">1-102</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">90</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">李四</td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <input
                                                        className="w-full px-2 py-1 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                                                        type="text"
                                                        defaultValue="13900139000"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                                                    手机号已存在
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-secondary hover:text-danger transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-gray-700">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Row 3: Error (Missing Field) */}
                                    {(activeTab === 'all' || activeTab === 'error') && (
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-700/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-danger text-[20px]" title="校验失败">warning</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-gray-100">2-201</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">88</td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <input
                                                        className="w-full px-2 py-1 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all placeholder:text-red-300 dark:placeholder:text-red-500"
                                                        placeholder="必填"
                                                        type="text"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">13700137000</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
                                                    必填项缺失
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-secondary hover:text-danger transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-gray-700">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Row 4: Success */}
                                    {(activeTab === 'all' || activeTab === 'success') && (
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-700/50 transition-colors opacity-60">
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-success text-[20px]" title="校验通过">check_circle</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-gray-100">2-202</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">130</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">赵六</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">13600136000</td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-text-secondary italic">无错误</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-secondary hover:text-danger transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-gray-700">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )}

                                    {/* Row 5: Success */}
                                    {(activeTab === 'all' || activeTab === 'success') && (
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-700/50 transition-colors opacity-60">
                                            <td className="px-6 py-4">
                                                <span className="material-symbols-outlined text-success text-[20px]" title="校验通过">check_circle</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-text-main dark:text-gray-100">3-301</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">100</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">孙七</td>
                                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-300">13500135000</td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-text-secondary italic">无错误</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-text-secondary hover:text-danger transition-colors p-1 rounded hover:bg-background-light dark:hover:bg-gray-700">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-between items-center bg-surface-light dark:bg-surface-dark">
                            <div className="text-sm text-text-secondary">
                                显示第 1 到 {activeTab === 'success' ? '2' : activeTab === 'error' ? '3' : '5'} 条数据
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-border-light dark:border-border-dark rounded text-sm text-text-secondary disabled:opacity-50" disabled>上一页</button>
                                <button className="px-3 py-1 border border-border-light dark:border-border-dark rounded text-sm text-text-secondary disabled:opacity-50" disabled>下一页</button>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Sticky Footer Actions */}
                <div className="absolute bottom-0 left-0 w-full bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-4 shadow-lg z-20">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="text-sm text-text-secondary flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">help</span>
                            <span>校验规则说明: 房号必须唯一，面积需为数字，手机号必须为11位。</span>
                        </div>
                        <div className="flex gap-4 sm:ml-auto">
                            <button className="px-6 py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-main dark:text-gray-200 font-medium text-sm hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                                取消导入
                            </button>
                            {/* Primary Action: Disabled State when there are errors */}
                            <button
                                className={clsx(
                                    "px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors",
                                    activeTab === 'success'
                                        ? "bg-primary text-white shadow-sm shadow-blue-500/30 hover:bg-primary-hover"
                                        : "bg-background-light dark:bg-gray-800 text-text-secondary cursor-not-allowed"
                                )}
                                disabled={activeTab !== 'success'}
                            >
                                {activeTab === 'success' ? '确认导入' : '确认导入 (需修复 3 个错误)'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
