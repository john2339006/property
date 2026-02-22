import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function UsersPage() {
    return (
        <>
            <Header>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">系统设置</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">用户与权限</span>
                </div>
            </Header>

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-10 custom-scrollbar">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">用户与权限管理</h1>
                            <p className="mt-2 text-text-secondary">管理公司员工账号及分配系统角色权限</p>
                        </div>
                    </div>

                    {/* Tabs & Content Area */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                        {/* Tabs Header */}
                        <div className="border-b border-border-light dark:border-border-dark px-6">
                            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                <button className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                                    用户列表
                                </button>
                                <button className="border-transparent text-text-secondary hover:text-text-main hover:border-border-light whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">info</span>
                                    角色说明
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content: User List */}
                        <div className="p-6">
                            {/* Action Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="relative w-full sm:w-80">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary">search</span>
                                    </div>
                                    <input
                                        className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark text-text-main dark:text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                        placeholder="搜索姓名或邮箱..."
                                        type="text"
                                    />
                                </div>
                                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors w-full sm:w-auto">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
                                    新增用户
                                </button>
                            </div>

                            {/* Data Table */}
                            <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark">
                                <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                                    <thead className="bg-background-light dark:bg-background-dark">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">姓名</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">账号 (Email)</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">角色</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">状态</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider" scope="col">最后登录</th>
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
                                                        <div className="text-sm font-medium text-text-main dark:text-white">张伟 (Zhang Wei)</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-secondary">zhang.wei@company.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Company Admin
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer mb-0">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-10 h-5 bg-border-light peer-focus:outline-none rounded-full peer dark:bg-border-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                    <span className="ml-2 text-xs font-medium text-success dark:text-green-400">启用</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-10-24 14:30
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="text-primary hover:text-primary-hover flex items-center" title="编辑">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="text-text-secondary hover:text-primary-hover flex items-center" title="重置密码">
                                                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                                                    </button>
                                                    <button className="text-danger hover:text-red-700 flex items-center" title="删除">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-sm">
                                                            LL
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-text-main dark:text-white">李莉 (Li Li)</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-secondary">li.li@company.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    Finance
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer mb-0">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-10 h-5 bg-border-light peer-focus:outline-none rounded-full peer dark:bg-border-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                    <span className="ml-2 text-xs font-medium text-success dark:text-green-400">启用</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-10-23 09:15
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="text-primary hover:text-primary-hover flex items-center" title="编辑">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="text-text-secondary hover:text-primary-hover flex items-center" title="重置密码">
                                                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                                                    </button>
                                                    <button className="text-danger hover:text-red-700 flex items-center" title="删除">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 3 */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <Image
                                                            alt="Avatar of Wang Qiang"
                                                            className="w-10 h-10 rounded-full object-cover border border-border-light dark:border-border-dark"
                                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6AU25yBO8bzdYH1MFnhmcUK-aJ-oDtqNM4Rw3YjIOdMZ1SOzSyVNiqcBBhBKx7fDXoK25y7ZXY1DRalFlZjK1mMSi4A943IiPvTF0SwGORFJv3Y5bXvVNVmXpvOGW8xhcGD1g7B1hcjqxi7efuLsYT97VWuCRfsM6XTWLVyHWhlEskPKsvdhI0_UA8UoQpCc67JAtNqvRhaWeQ6pDvMKLMdxHXsojvBesZGknd9ohea1qjovctCNNVVMFmNXK69pYFUOdn5yg2_4"
                                                            width={40}
                                                            height={40}
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-text-main dark:text-white">王强 (Wang Qiang)</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-secondary">wang.qiang@company.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                                    Operator
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer mb-0">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-10 h-5 bg-border-light peer-focus:outline-none rounded-full peer dark:bg-border-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                    <span className="ml-2 text-xs font-medium text-text-secondary">禁用</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-09-12 11:20
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="text-primary hover:text-primary-hover flex items-center" title="编辑">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="text-text-secondary hover:text-primary-hover flex items-center" title="重置密码">
                                                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                                                    </button>
                                                    <button className="text-danger hover:text-red-700 flex items-center" title="删除">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr className="hover:bg-primary-light/30 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm">
                                                            CJ
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-text-main dark:text-white">陈静 (Chen Jing)</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-text-secondary">chen.jing@company.com</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                    Read Only
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <label className="relative inline-flex items-center cursor-pointer mb-0">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-10 h-5 bg-border-light peer-focus:outline-none rounded-full peer dark:bg-border-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                    <span className="ml-2 text-xs font-medium text-success dark:text-green-400">启用</span>
                                                </label>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                2023-10-20 16:45
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="text-primary hover:text-primary-hover flex items-center" title="编辑">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button className="text-text-secondary hover:text-primary-hover flex items-center" title="重置密码">
                                                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                                                    </button>
                                                    <button className="text-danger hover:text-red-700 flex items-center" title="删除">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
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
                                            显示 <span className="font-medium">1</span> 到 <span className="font-medium">4</span> 条，共 <span className="font-medium">12</span> 条结果
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

                    {/* Role Descriptions Reference */}
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-text-secondary">policy</span>
                            <h3 className="text-lg font-bold text-text-main dark:text-white">权限角色说明参考</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                            {/* Role Card 1 */}
                            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main dark:text-white">公司管理员 (Company Admin)</span>
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    拥有最高权限，可管理所有模块，包括用户管理、系统设置及敏感数据操作。
                                </p>
                            </div>

                            {/* Role Card 2 */}
                            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-2 hover:border-green-300 dark:hover:border-green-600 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main dark:text-white">财务 (Finance)</span>
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    具备费用配置、调价及发票管理权限，可查看财务报表，无系统设置权限。
                                </p>
                            </div>

                            {/* Role Card 3 */}
                            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-2 hover:border-amber-300 dark:hover:border-amber-600 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main dark:text-white">运营人员 (Operator)</span>
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    负责日常房产与租户管理，可编辑租户信息，处理工单，但无法进行财务操作。
                                </p>
                            </div>

                            {/* Role Card 4 */}
                            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-2 hover:border-gray-400 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main dark:text-white">只读 (Read Only)</span>
                                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    仅具备全平台数据的查看权限，无法进行任何新增、修改或删除操作。
                                </p>
                            </div>

                            {/* Role Card 5 */}
                            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-2 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-text-main dark:text-white">平台管理员 (Platform Admin)</span>
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    仅针对SaaS平台方使用，具备跨租户管理、全局配置及系统维护权限。
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
