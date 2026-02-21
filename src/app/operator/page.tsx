import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function OperatorWorkbenchPage() {
    return (
        <>
            <Header>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">操作员工作台</span>
                </div>
            </Header>

            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark custom-scrollbar">
                <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8">

                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-bold tracking-tight text-text-main dark:text-white">欢迎回来，张伟</h2>
                            <p className="text-text-secondary text-sm font-normal flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                2023年10月27日 星期五
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800 text-text-main dark:text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">notifications</span>
                                <span>通知 (3)</span>
                            </button>
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-sm shadow-blue-500/30">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span>新建工单</span>
                            </button>
                        </div>
                    </header>

                    {/* Metrics Row */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Metric 1 */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-primary">apartment</span>
                            </div>
                            <div className="flex items-center justify-between z-10">
                                <p className="text-text-secondary text-sm font-medium">房屋总数</p>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +2.5%
                                </span>
                            </div>
                            <div className="z-10">
                                <p className="text-3xl font-bold text-text-main dark:text-white tracking-tight">1,240</p>
                                <p className="text-xs text-text-secondary mt-1">较上月新增 30 套</p>
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-primary">key</span>
                            </div>
                            <div className="flex items-center justify-between z-10">
                                <p className="text-text-secondary text-sm font-medium">今日入住/售出</p>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
                                </span>
                            </div>
                            <div className="z-10">
                                <p className="text-3xl font-bold text-text-main dark:text-white tracking-tight">12</p>
                                <p className="text-xs text-text-secondary mt-1">入住 8 / 售出 4</p>
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-orange-500">person_add</span>
                            </div>
                            <div className="flex items-center justify-between z-10">
                                <p className="text-text-secondary text-sm font-medium">待办业主变更</p>
                                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">priority_high</span> 需关注
                                </span>
                            </div>
                            <div className="z-10">
                                <p className="text-3xl font-bold text-text-main dark:text-white tracking-tight">5</p>
                                <p className="text-xs text-text-secondary mt-1">2 个加急请求</p>
                            </div>
                        </div>

                        {/* Metric 4 */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-primary">assignment</span>
                            </div>
                            <div className="flex items-center justify-between z-10">
                                <p className="text-text-secondary text-sm font-medium">待处理工单</p>
                                <span className="bg-background-light dark:bg-gray-700 text-text-secondary dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
                                    0% 变化
                                </span>
                            </div>
                            <div className="z-10">
                                <p className="text-3xl font-bold text-text-main dark:text-white tracking-tight">8</p>
                                <p className="text-xs text-text-secondary mt-1">全部为常规维修</p>
                            </div>
                        </div>
                    </section>

                    {/* Main Body: Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

                        {/* Left Column: Quick Access */}
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                                常用功能 (Quick Access)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">

                                {/* Quick Access Card 1 */}
                                <button className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 hover:shadow-md transition-all group text-left flex flex-col h-full justify-center">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary text-2xl">add_home</span>
                                    </div>
                                    <h4 className="text-base font-bold text-text-main dark:text-white mb-1">房屋登记</h4>
                                    <p className="text-sm text-text-secondary">快速录入新房源信息，支持批量操作</p>
                                </button>

                                {/* Quick Access Card 2 */}
                                <button className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 hover:shadow-md transition-all group text-left flex flex-col h-full justify-center">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">person_add_alt</span>
                                    </div>
                                    <h4 className="text-base font-bold text-text-main dark:text-white mb-1">业主入驻</h4>
                                    <p className="text-sm text-text-secondary">新业主身份验证与信息登记流程</p>
                                </button>

                                {/* Quick Access Card 3 */}
                                <button className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 hover:shadow-md transition-all group text-left flex flex-col h-full justify-center">
                                    <div className="bg-green-50 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-success dark:text-green-400 text-2xl">upload_file</span>
                                    </div>
                                    <h4 className="text-base font-bold text-text-main dark:text-white mb-1">导入数据</h4>
                                    <p className="text-sm text-text-secondary">批量上传Excel表格，更新系统记录</p>
                                </button>

                                {/* Quick Access Card 4 */}
                                <button className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 hover:shadow-md transition-all group text-left flex flex-col h-full justify-center">
                                    <div className="bg-orange-50 dark:bg-orange-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">manage_search</span>
                                    </div>
                                    <h4 className="text-base font-bold text-text-main dark:text-white mb-1">费用查询</h4>
                                    <p className="text-sm text-text-secondary">查询物业费、水电费缴纳明细</p>
                                </button>
                            </div>
                        </div>

                        {/* Right Column: To-Do List */}
                        <div className="lg:col-span-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">checklist</span>
                                    待办事项
                                </h3>
                                <Link className="text-sm text-primary font-medium hover:underline" href="#">查看全部</Link>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm flex-1 flex flex-col overflow-hidden">

                                {/* To-Do Item 1 */}
                                <div className="p-4 border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3">
                                            <div className="mt-1 min-w-[20px]">
                                                <span className="h-2 w-2 rounded-full bg-danger block"></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-text-main dark:text-white">3个房屋信息需要补全</p>
                                                <p className="text-xs text-text-secondary mt-1">系统检测到必填项缺失</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-primary bg-primary-light dark:bg-primary/20 hover:bg-primary hover:text-white px-3 py-1.5 rounded-md transition-colors shrink-0">
                                            去处理
                                        </button>
                                    </div>
                                </div>

                                {/* To-Do Item 2 */}
                                <div className="p-4 border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3">
                                            <div className="mt-1 min-w-[20px]">
                                                <span className="h-2 w-2 rounded-full bg-warning block"></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-text-main dark:text-white">2位业主信息版本待审核</p>
                                                <p className="text-xs text-text-secondary mt-1">提交时间: 2小时前</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-primary bg-primary-light dark:bg-primary/20 hover:bg-primary hover:text-white px-3 py-1.5 rounded-md transition-colors shrink-0">
                                            审核
                                        </button>
                                    </div>
                                </div>

                                {/* To-Do Item 3 */}
                                <div className="p-4 border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3">
                                            <div className="mt-1 min-w-[20px]">
                                                <span className="h-2 w-2 rounded-full bg-primary block"></span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-text-main dark:text-white">季度消防检查提醒</p>
                                                <p className="text-xs text-text-secondary mt-1">计划日期: 明天</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-primary bg-primary-light dark:bg-primary/20 hover:bg-primary hover:text-white px-3 py-1.5 rounded-md transition-colors shrink-0">
                                            查看
                                        </button>
                                    </div>
                                </div>

                                {/* Empty state filler */}
                                <div className="flex-1 min-h-[50px] bg-background-light/50 dark:bg-gray-800/20 flex items-center justify-center p-4">
                                    <p className="text-xs text-text-secondary flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        暂时没有更多紧急事项
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Recent Activities */}
                    <section className="flex flex-col gap-4 pb-6">
                        <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            最近操作 (Recent Activities)
                        </h3>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-background-light dark:bg-gray-800 text-text-secondary font-medium border-b border-border-light dark:border-border-dark">
                                        <tr>
                                            <th className="px-6 py-3 whitespace-nowrap">时间</th>
                                            <th className="px-6 py-3 whitespace-nowrap">操作类型</th>
                                            <th className="px-6 py-3 whitespace-nowrap">对象/详情</th>
                                            <th className="px-6 py-3 whitespace-nowrap">状态</th>
                                            <th className="px-6 py-3 text-right">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                        <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">10 分钟前</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-blue-500">edit_note</span>
                                                    <span className="text-text-main dark:text-white font-medium">更新信息</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">更新了 101单元 房屋基础信息</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                    成功
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link className="text-primary hover:text-primary-hover font-medium text-xs" href="#">查看详情</Link>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">1 小时前</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-purple-500">verified_user</span>
                                                    <span className="text-text-main dark:text-white font-medium">审批通过</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">通过了 李四 的业主入驻申请</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                    成功
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link className="text-primary hover:text-primary-hover font-medium text-xs" href="#">查看详情</Link>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">今天 09:30</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-orange-500">file_download</span>
                                                    <span className="text-text-main dark:text-white font-medium">导出报表</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">导出 10月份物业费催缴名单.xlsx</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-background-light text-text-secondary dark:bg-gray-700 dark:text-gray-300 border border-border-light dark:border-gray-600">
                                                    已完成
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link className="text-primary hover:text-primary-hover font-medium text-xs" href="#">下载</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
