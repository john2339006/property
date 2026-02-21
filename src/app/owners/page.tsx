import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function OwnersPage() {
    return (
        <>
            <Header>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">业主管理</span>
                </div>
            </Header>

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-10 custom-scrollbar">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">业主列表</h1>
                            <p className="mt-2 text-text-secondary">管理所有房产相关人员的档案与状态</p>
                        </div>
                        <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg shadow-sm transition-all text-sm font-medium">
                            <span className="material-symbols-outlined text-[20px]">person_add</span>
                            新增业主
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">

                        <div className="p-6">
                            {/* Action Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="relative w-full sm:w-80">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary">search</span>
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-main dark:text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                        placeholder="搜索姓名、手机号或身份证号..."
                                        type="text"
                                    />
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <select className="flex-1 sm:w-auto block w-full pl-3 pr-8 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors cursor-pointer outline-none shadow-sm appearance-none">
                                        <option value="">状态: 全部</option>
                                        <option value="active">活跃</option>
                                        <option value="lost">已流失</option>
                                    </select>

                                    <button className="inline-flex items-center justify-center px-3 py-2 border border-border-light dark:border-border-dark text-sm font-medium rounded-lg text-text-main dark:text-white bg-background-light dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    </button>
                                    <button className="inline-flex items-center justify-center px-3 py-2 border border-border-light dark:border-border-dark text-sm font-medium rounded-lg text-text-main dark:text-white bg-background-light dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                    </button>
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark">
                                <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                                    <thead className="bg-background-light dark:bg-background-dark">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">姓名</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">联系方式</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">关联房产</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">状态</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">加入时间</th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light dark:divide-border-dark">

                                        {/* Row 1 */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <Image
                                                            alt="Avatar of Zhang Wei"
                                                            className="w-10 h-10 rounded-full object-cover border border-border-light dark:border-border-dark"
                                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrTfh1IGgMO33PfI24o0mQj8-hCz0J15Zfqh3qA-GO1nPZk6F4KJP7kbm83HIIUeUDOy7BcEvq7fT5rA1QRSEy0RmG1GIZoxB4yuTPbUg2au-8dnvfKwjoCCiCRjJlpjcXW4e8iCtmtke1oC_sHreSRhG9k3vmpPoqmhXhLse7LLFXW5-ffReOKh_jgXi50yv3zXmybVHZu0V4XamppLoTu14YhWtICJ90ChN0SDmJRHJhF0xTgsI1FYRsK7CZ_WTIHYNMekfZYFQ"
                                                            width={40}
                                                            height={40}
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link href="/owners/user_7a8b9c0d1e2f3a4b" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">张伟</Link>
                                                        <div className="text-xs text-text-secondary mt-0.5">身份证: 110105********1234</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-main dark:text-white">138-0000-0001</div>
                                                <div className="text-xs text-text-secondary">zhang.wei@example.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-text-main dark:text-white">幸福花园 A栋-1801</div>
                                                <div className="text-xs text-text-secondary mt-0.5"><span className="px-1.5 py-0.5 rounded text-[10px] bg-primary-light text-primary border border-primary/20">产权人</span> / 128㎡</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
                                                    活跃
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-01-15
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm border-l border-transparent group-hover:border-border-light dark:group-hover:border-border-dark transition-colors">
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <Link href="/owners/user_7a8b9c0d1e2f3a4b" className="text-primary hover:text-primary-hover font-medium">查看档案</Link>
                                                    <span className="text-text-secondary hover:text-text-main dark:hover:text-white cursor-pointer font-medium">编辑资料</span>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-sm">
                                                            LXY
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link href="/owners/user_8b9c0d1e2f3a4b5" className="text-sm font-medium text-text-main dark:text-white hover:text-primary transition-colors">李秀英</Link>
                                                        <div className="text-xs text-text-secondary mt-0.5">身份证: 110108********5678</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-main dark:text-white">139-1111-2222</div>
                                                <div className="text-xs text-text-secondary">li.xiuying@example.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div>
                                                        <div className="text-sm font-medium text-text-main dark:text-white">幸福花园 A栋-1802</div>
                                                        <div className="text-xs text-text-secondary"><span className="px-1.5 py-0.5 rounded text-[10px] bg-primary-light text-primary border border-primary/20">产权人</span> / 96㎡</div>
                                                    </div>
                                                    <div className="text-xs text-text-secondary border-t border-border-light dark:border-border-dark pt-1">
                                                        + 另外 1 处房产
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
                                                    活跃
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-02-20
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <Link href="/owners/user_8b9c0d1e2f3a4b5" className="text-primary hover:text-primary-hover font-medium">查看档案</Link>
                                                    <span className="text-text-secondary hover:text-text-main dark:hover:text-white cursor-pointer font-medium">编辑资料</span>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 3 - Lost Status */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm">
                                                            WQ
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link href="/owners/user_lost_example" className="text-sm font-medium text-text-main dark:text-white hover:text-primary transition-colors">王强</Link>
                                                        <div className="text-xs text-text-secondary mt-0.5">身份证: 110101********9012</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-main dark:text-white hidden lg:block">137-5555-6666</div>
                                                <div className="text-xs text-text-secondary">未提供邮箱</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-secondary italic">无关联房产</div>
                                                <div className="text-xs text-text-secondary mt-0.5">曾持有 1 处房产</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                    已流失 / 售出
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                <div className="text-sm">2021-08-10 (入)</div>
                                                <div className="text-xs text-text-secondary">2023-09-01 (出)</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <Link href="/owners/user_lost_example" className="text-primary hover:text-primary-hover font-medium">查看档案</Link>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-surface-light dark:bg-surface-dark px-4 py-3 flex items-center justify-between border-t border-border-light dark:border-border-dark sm:px-6 mt-4 rounded-lg">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-text-secondary">
                                            显示 <span className="font-medium text-text-main dark:text-white">1</span> 到 <span className="font-medium text-text-main dark:text-white">3</span> 条，共 <span className="font-medium text-text-main dark:text-white">45</span> 条结果
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm font-medium text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
                                                <span className="sr-only">Previous</span>
                                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                            </button>
                                            <button className="z-10 bg-primary-light border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                                            <button className="bg-background-light border-border-light text-text-secondary hover:bg-gray-50 dark:bg-background-dark dark:border-border-dark dark:hover:bg-gray-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</button>
                                            <button className="bg-background-light border-border-light text-text-secondary hover:bg-gray-50 dark:bg-background-dark dark:border-border-dark dark:hover:bg-gray-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium">3</button>
                                            <span className="relative inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm font-medium text-text-secondary">...</span>
                                            <button className="bg-background-light border-border-light text-text-secondary hover:bg-gray-50 dark:bg-background-dark dark:border-border-dark dark:hover:bg-gray-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium">5</button>
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm font-medium text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
                                                <span className="sr-only">Next</span>
                                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
