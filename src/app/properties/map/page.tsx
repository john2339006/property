"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import clsx from "clsx";

export default function PropertyMapPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Header>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <Link href="/properties" className="hover:text-primary transition-colors cursor-pointer">房产管理</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">可视化看盘</span>
                </div>
            </Header>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
                {/* Page Toolbar */}
                <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                            可视化看盘
                        </h1>
                        <p className="text-sm text-text-secondary mt-1">实时查看楼宇入住情况与房产状态</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/properties" className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white border border-border-light dark:border-border-dark text-sm font-medium rounded-lg shadow-sm transition-colors">
                            <span className="material-symbols-outlined text-[18px]">list</span>
                            <span>列表视图</span>
                        </Link>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-secondary text-[20px]">location_city</span>
                            </div>
                            <select className="pl-10 pr-8 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer shadow-sm appearance-none min-w-[140px]">
                                <option>幸福花园 A栋</option>
                                <option>幸福花园 B栋</option>
                                <option>幸福花园 C栋</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-secondary text-[18px]">expand_more</span>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-secondary text-[20px]">meeting_room</span>
                            </div>
                            <select className="pl-10 pr-8 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer shadow-sm appearance-none min-w-[120px]">
                                <option>1 单元</option>
                                <option>2 单元</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-secondary text-[18px]">expand_more</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg shadow-sm transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                            <span>刷新数据</span>
                        </button>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-3 flex flex-wrap items-center gap-6 text-sm flex-shrink-0">
                    <div className="flex items-center gap-6 border-r border-border-light dark:border-border-dark pr-6 mr-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-text-secondary font-medium">总户数</span>
                            <span className="text-lg font-bold text-text-main dark:text-white leading-tight">72</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-text-secondary font-medium">入住率</span>
                            <span className="text-lg font-bold text-text-main dark:text-white leading-tight">83.3%</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-success shadow-sm"></span>
                            <div className="flex flex-col">
                                <span className="font-medium text-text-main dark:text-gray-200">已售/激活</span>
                                <span className="text-xs text-text-secondary">60 户</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary shadow-sm"></span>
                            <div className="flex flex-col">
                                <span className="font-medium text-text-main dark:text-gray-200">待售/空置</span>
                                <span className="text-xs text-text-secondary">12 户</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-400 shadow-sm"></span>
                            <div className="flex flex-col">
                                <span className="font-medium text-text-main dark:text-gray-200">非激活/维修</span>
                                <span className="text-xs text-text-secondary">0 户</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-xs bg-background-light dark:bg-gray-800 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]">info</span>
                        点击房号查看详情
                    </div>
                </div>

                {/* Visualization Grid Area */}
                <div className="flex-1 overflow-auto bg-background-light/50 dark:bg-black/20 p-6 custom-scrollbar relative">

                    {/* Building Container */}
                    <div className="mx-auto max-w-5xl bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-8 min-w-[600px]">

                        {/* Roof Decoration */}
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-t-lg mx-12 mb-1 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:10px_10px]"></div>
                        </div>

                        {/* Grid */}
                        <div className="flex flex-col gap-3">

                            {/* Header Row (Room Numbers) */}
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 flex-shrink-0"></div>
                                <div className="grid grid-cols-4 gap-4 flex-1 text-center">
                                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">01 室</div>
                                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">02 室</div>
                                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">03 室</div>
                                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">04 室</div>
                                </div>
                            </div>

                            {/* Floor 18 */}
                            <div className="flex items-center gap-4 group/floor">
                                <div className="w-12 h-20 flex flex-col items-center justify-center rounded bg-background-light dark:bg-gray-800 border border-border-light dark:border-border-dark flex-shrink-0 group-hover/floor:bg-gray-200 dark:group-hover/floor:bg-gray-700 transition-colors">
                                    <span className="text-sm font-bold text-text-secondary dark:text-gray-400">18F</span>
                                </div>
                                <div className="grid grid-cols-4 gap-4 flex-1">

                                    {/* Room 1801 (Sold) */}
                                    <div className="relative group h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all active:scale-[0.98]">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1801</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">张伟</span>
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                            <div className="font-bold text-sm mb-1">1801室</div>
                                            <div className="flex justify-between mb-0.5"><span className="text-gray-400">业主:</span> <span>张伟</span></div>
                                            <div className="flex justify-between mb-0.5"><span className="text-gray-400">面积:</span> <span>128㎡</span></div>
                                            <div className="flex justify-between"><span className="text-gray-400">状态:</span> <span className="text-green-400">已售/自住</span></div>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                        </div>
                                    </div>

                                    {/* Room 1802 (Sold) */}
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1802</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">李秀英</span>
                                        </div>
                                    </div>

                                    {/* Room 1803 (Vacant) */}
                                    <div
                                        onClick={() => setDrawerOpen(true)}
                                        className="h-20 bg-blue-50 dark:bg-blue-900/10 border-2 border-primary/30 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-primary hover:shadow-md transition-all relative"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-text-main dark:text-white">1803</span>
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">待售</span>
                                            <span className="text-xs text-text-secondary">89㎡</span>
                                        </div>
                                    </div>

                                    {/* Room 1804 (Sold) */}
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1804</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">王强</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Floor 17 */}
                            <div className="flex items-center gap-4 group/floor">
                                <div className="w-12 h-20 flex flex-col items-center justify-center rounded bg-background-light dark:bg-gray-800 border border-border-light dark:border-border-dark flex-shrink-0 group-hover/floor:bg-gray-200 dark:group-hover/floor:bg-gray-700 transition-colors">
                                    <span className="text-sm font-bold text-text-secondary dark:text-gray-400">17F</span>
                                </div>
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1701</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">刘芳</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1702</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">陈杰</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-gray-100 dark:bg-gray-800/80 border-2 border-border-light dark:border-border-dark rounded-lg p-3 flex flex-col justify-between cursor-not-allowed opacity-75">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-text-secondary">1703</span>
                                            <span className="material-symbols-outlined text-[16px] text-text-secondary">lock</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-text-secondary font-medium">维修中</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1704</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">杨军</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floor 16 */}
                            <div className="flex items-center gap-4 group/floor">
                                <div className="w-12 h-20 flex flex-col items-center justify-center rounded bg-background-light dark:bg-gray-800 border border-border-light dark:border-border-dark flex-shrink-0 group-hover/floor:bg-gray-200 dark:group-hover/floor:bg-gray-700 transition-colors">
                                    <span className="text-sm font-bold text-text-secondary dark:text-gray-400">16F</span>
                                </div>
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1601</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">赵敏</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-blue-50 dark:bg-blue-900/10 border-2 border-primary/30 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-primary hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-text-main dark:text-white">1602</span>
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded">待售</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1603</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">孙丽</span>
                                        </div>
                                    </div>
                                    <div className="h-20 bg-green-50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-900/50 rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:border-success hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-green-900 dark:text-green-100">1604</span>
                                            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs text-green-700 dark:text-green-400 truncate font-medium">周建国</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 text-center text-text-secondary text-sm">
                            已显示 3/18 层数据 · 滚动查看更多
                        </div>

                    </div>
                </div>

                {/* Drawer Overlay */}
                <div
                    className={clsx(
                        "fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 transition-opacity duration-300",
                        drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setDrawerOpen(false)}
                ></div>

                {/* Drawer Panel */}
                <div
                    className={clsx(
                        "fixed top-0 right-0 h-full w-[400px] bg-surface-light dark:bg-surface-dark shadow-2xl z-50 flex flex-col border-l border-border-light dark:border-border-dark transition-transform duration-300 ease-in-out",
                        drawerOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-background-light dark:bg-background-dark/50">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-bold text-text-main dark:text-white">1803 室</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-primary-light dark:bg-primary/20 text-primary text-xs font-bold border border-primary/20">待售</span>
                            </div>
                            <p className="text-text-secondary text-sm">幸福花园 A栋 / 1单元 / 18层</p>
                        </div>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="p-2 hover:bg-border-light dark:hover:bg-gray-800 rounded-full transition-colors text-text-secondary"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                        {/* Basic Info Card */}
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-3">基本信息</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-background-light dark:bg-background-dark/50 p-3 rounded-lg border border-border-light dark:border-border-dark">
                                    <span className="block text-xs text-text-secondary mb-1">建筑面积</span>
                                    <span className="block text-lg font-bold text-text-main dark:text-white">89 ㎡</span>
                                </div>
                                <div className="bg-background-light dark:bg-background-dark/50 p-3 rounded-lg border border-border-light dark:border-border-dark">
                                    <span className="block text-xs text-text-secondary mb-1">套内面积</span>
                                    <span className="block text-lg font-bold text-text-main dark:text-white">72 ㎡</span>
                                </div>
                                <div className="bg-background-light dark:bg-background-dark/50 p-3 rounded-lg border border-border-light dark:border-border-dark">
                                    <span className="block text-xs text-text-secondary mb-1">房型</span>
                                    <span className="block text-base font-bold text-text-main dark:text-white">2室1厅1卫</span>
                                </div>
                                <div className="bg-background-light dark:bg-background-dark/50 p-3 rounded-lg border border-border-light dark:border-border-dark">
                                    <span className="block text-xs text-text-secondary mb-1">朝向</span>
                                    <span className="block text-base font-bold text-text-main dark:text-white">南</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Info */}
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-3">销售信息</h3>
                            <div className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                                    <span className="text-sm text-text-secondary">预售单价</span>
                                    <span className="font-medium text-text-main dark:text-white">¥ 45,000 / ㎡</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark">
                                    <span className="text-sm text-text-secondary">总价</span>
                                    <span className="font-bold text-lg text-primary">¥ 4,005,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Action History */}
                        <div>
                            <h3 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider mb-3">最近动态</h3>
                            <div className="relative pl-4 border-l-2 border-border-light dark:border-gray-700 space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-border-light dark:bg-gray-600 border-2 border-surface-light dark:border-surface-dark"></div>
                                    <p className="text-sm text-text-main dark:text-gray-200 mb-1">看房记录：李先生 (138****0000)</p>
                                    <p className="text-xs text-text-secondary">2023-10-24 14:30</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-border-light dark:bg-gray-600 border-2 border-surface-light dark:border-surface-dark"></div>
                                    <p className="text-sm text-text-main dark:text-gray-200 mb-1">系统导入房源数据</p>
                                    <p className="text-xs text-text-secondary">2023-10-01 09:00</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Drawer Footer */}
                    <div className="p-6 border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                        <button className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg shadow transition-colors flex items-center justify-center gap-2">
                            <span>查看完整详情</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
