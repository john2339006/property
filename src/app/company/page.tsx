import Header from "@/components/Header";
import Link from "next/link";

export default function CompanyProfilePage() {
    return (
        <>
            <Header>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link href="/" className="hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">系统设置</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">公司档案</span>
                </div>
            </Header>

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-8 custom-scrollbar">
                <div className="max-w-5xl mx-auto space-y-6 pb-20">

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight">公司档案与结算设置</h1>
                            <p className="text-text-secondary mt-1 text-sm">管理您的公司法律实体信息与财务结算偏好设置</p>
                        </div>
                        <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all focus:ring-4 focus:ring-primary/20">
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            <span>保存更改</span>
                        </button>
                    </div>

                    {/* Section 1: Legal Identity */}
                    <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified_user</span>
                            <h2 className="text-base font-bold text-text-main dark:text-white">主体信息</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">公司法定名称 <span className="text-danger">*</span></label>
                                <input
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 outline-none transition-colors"
                                    placeholder="请输入公司注册全称"
                                    type="text"
                                    defaultValue="未来科技有限公司"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">营业执照编号 <span className="text-danger">*</span></label>
                                <input
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 outline-none transition-colors"
                                    placeholder="请输入18位统一社会信用代码"
                                    type="text"
                                    defaultValue="91310000XXXXXXXXXX"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">企业联系方式</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary text-[20px]">call</span>
                                    </span>
                                    <input
                                        className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm pl-10 pr-3 py-2.5 outline-none transition-colors"
                                        placeholder="021-xxxxxxxx 或 138xxxxxxxx"
                                        type="tel"
                                        defaultValue="021-55558888"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Billing & Currency */}
                    <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">payments</span>
                            <h2 className="text-base font-bold text-text-main dark:text-white">账务与货币</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-text-main dark:text-gray-300">结算币种</label>
                                    <span className="text-xs text-text-secondary bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark px-2 py-0.5 rounded">系统锁定</span>
                                </div>
                                <select
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-gray-800/50 text-text-secondary cursor-not-allowed focus:border-border-light focus:ring-0 text-sm py-2.5 px-3 opacity-70 appearance-none outline-none"
                                    disabled
                                >
                                    <option defaultValue="CNY">CNY - 人民币 (RMB)</option>
                                </select>
                                <p className="text-xs text-text-secondary mt-1">如需更改结算币种，请联系平台管理员。</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300 block mb-3">默认账期</label>
                                <div className="flex items-center gap-5 pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            defaultChecked
                                            className="w-4 h-4 text-primary border-border-light focus:ring-primary/20 bg-background-light dark:bg-background-dark dark:border-border-dark"
                                            name="billing_period"
                                            type="radio"
                                        />
                                        <span className="text-sm text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">按月结算</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            className="w-4 h-4 text-primary border-border-light focus:ring-primary/20 bg-background-light dark:bg-background-dark dark:border-border-dark"
                                            name="billing_period"
                                            type="radio"
                                        />
                                        <span className="text-sm text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">按年结算</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Billing Info */}
                    <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">receipt_long</span>
                            <h2 className="text-base font-bold text-text-main dark:text-white">开票信息</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">开户行 <span className="text-danger">*</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-text-secondary text-[20px]">account_balance</span>
                                    </span>
                                    <input
                                        className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm pl-10 pr-3 py-2.5 outline-none transition-colors"
                                        placeholder="例如：中国工商银行北京分行"
                                        type="text"
                                        defaultValue="中国招商银行上海徐汇支行"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">银行账号 <span className="text-danger">*</span></label>
                                <input
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 font-mono outline-none transition-colors"
                                    placeholder="请输入银行账号"
                                    type="text"
                                    defaultValue="6225 8888 8888 8888"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">纳税人识别号 <span className="text-danger">*</span></label>
                                <input
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 font-mono outline-none transition-colors"
                                    placeholder="请输入纳税人识别号"
                                    type="text"
                                    defaultValue="91310000XXXXXXXXXX"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Address */}
                    <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <h2 className="text-base font-bold text-text-main dark:text-white">联系地址</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main dark:text-gray-300">注册地址</label>
                                <textarea
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 resize-none outline-none transition-colors"
                                    placeholder="请输入营业执照上的注册地址"
                                    rows={3}
                                    defaultValue="上海市浦东新区张江高科技园区xx路xx号"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-sm font-medium text-text-main dark:text-gray-300">办公地址</label>
                                    <label className="flex items-center gap-1.5 cursor-pointer group">
                                        <input
                                            className="w-3.5 h-3.5 text-primary border-border-light rounded focus:ring-primary/20 bg-background-light dark:bg-background-dark dark:border-border-dark"
                                            type="checkbox"
                                        />
                                        <span className="text-xs text-text-secondary group-hover:text-text-main transition-colors mt-[1px]">同注册地址</span>
                                    </label>
                                </div>
                                <textarea
                                    className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 resize-none outline-none transition-colors"
                                    placeholder="请输入实际办公地址"
                                    rows={3}
                                    defaultValue="上海市徐汇区虹桥路1号港汇恒隆广场1座"
                                />
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
