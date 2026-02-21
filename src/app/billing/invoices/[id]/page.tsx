"use client";

import Header from "@/components/Header";
import Link from "next/link";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Header>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                    <Link href="/" className="text-text-secondary hover:text-primary transition-colors">首页</Link>
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">chevron_right</span>
                    <Link href="/billing" className="text-text-secondary hover:text-primary transition-colors">财务管理</Link>
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">chevron_right</span>
                    <span className="text-text-secondary">发票管理</span>
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">发票详情</span>
                </div>
            </Header>

            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
                {/* Page Toolbar */}
                <div className="px-6 py-4 md:pt-6 md:px-8 shrink-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white tracking-tight">发票详情与打印预览</h1>
                            <p className="text-text-secondary mt-1">查看详细信息、下载PDF结算单或直接打印。</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/billing" className="px-4 py-2 text-text-main dark:text-white bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium hover:bg-background-light dark:hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                返回列表
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content Split View */}
                <div className="flex-1 overflow-hidden p-4 md:p-8 pt-2 flex flex-col lg:flex-row gap-6">

                    {/* Left Pane: Details & Actions */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto lg:overflow-visible pb-10 custom-scrollbar hide-on-print">

                        {/* Status Card */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm p-5 border border-border-light dark:border-border-dark">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-text-main dark:text-white">发票状态</h3>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900">
                                    <span className="w-2 h-2 rounded-full bg-success"></span>
                                    已付 (Paid)
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border-light dark:border-border-dark">
                                    <span className="text-text-secondary text-sm">发票编号</span>
                                    <span className="font-mono text-text-main dark:text-white font-medium">#INV-2023-8821</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border-light dark:border-border-dark">
                                    <span className="text-text-secondary text-sm">开票日期</span>
                                    <span className="text-text-main dark:text-white font-medium">2023-11-05</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-border-light dark:border-border-dark">
                                    <span className="text-text-secondary text-sm">支付方式</span>
                                    <span className="text-text-main dark:text-white font-medium">银行转账</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm p-5 border border-border-light dark:border-border-dark flex-1">
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-4">基本信息</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 block">房屋信息</label>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded text-primary">
                                            <span className="material-symbols-outlined text-[20px]">domain</span>
                                        </div>
                                        <div>
                                            <p className="text-text-main dark:text-white font-medium">幸福小区 2栋</p>
                                            <p className="text-text-secondary text-sm">101室 (Unit 101)</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 block">业主信息</label>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1.5 bg-purple-50 dark:bg-purple-900/20 rounded text-purple-600">
                                            <span className="material-symbols-outlined text-[20px]">person</span>
                                        </div>
                                        <div>
                                            <p className="text-text-main dark:text-white font-medium">张三 (Zhang San)</p>
                                            <p className="text-text-secondary text-sm">138 **** 8888</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 block">账期</label>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 p-1.5 bg-orange-50 dark:bg-orange-900/20 rounded text-orange-600">
                                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                        </div>
                                        <div>
                                            <p className="text-text-main dark:text-white font-medium">2023年10月</p>
                                            <p className="text-text-secondary text-sm">2023-10-01 至 2023-10-31</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3">
                                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                                    <span className="material-symbols-outlined">download</span>
                                    下载 PDF
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="w-full bg-surface-light dark:bg-surface-dark border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                >
                                    <span className="material-symbols-outlined">print</span>
                                    打印预览
                                </button>
                                <div className="pt-4 mt-2 border-t border-border-light dark:border-border-dark">
                                    <button className="w-full text-danger hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                                        作废发票 (Void Invoice)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: PDF Preview */}
                    <div className="w-full lg:w-2/3 h-full overflow-hidden bg-gray-100 dark:bg-black/40 rounded-xl border border-border-light dark:border-border-dark relative flex flex-col preview-container">
                        {/* Preview Toolbar */}
                        <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-4 py-2 flex justify-between items-center shrink-0 hide-on-print">
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Preview Mode: A4</span>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-text-secondary hover:text-text-main dark:hover:text-white rounded hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">zoom_out</span>
                                </button>
                                <span className="text-xs font-medium text-text-secondary w-12 text-center">100%</span>
                                <button className="p-1.5 text-text-secondary hover:text-text-main dark:hover:text-white rounded hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Area */}
                        <div className="overflow-auto flex-1 p-4 md:p-8 flex justify-center custom-scrollbar">

                            {/* The "Paper" Invoice */}
                            <div id="invoice-preview" className="bg-white text-black w-full max-w-[700px] min-h-[990px] shadow-sm md:shadow-lg p-6 md:p-10 relative flex flex-col justify-between shrink-0">

                                {/* Invoice Header */}
                                <div className="border-b-2 border-black pb-6 mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-3xl">apartment</span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold tracking-tight">星河物业管理有限公司</h2>
                                                <p className="text-sm text-gray-600">Galaxy Property Management Co., Ltd.</p>
                                            </div>
                                        </div>
                                        <div className="md:text-right">
                                            <h1 className="text-3xl font-black text-black tracking-wider uppercase">物业费结算单</h1>
                                            <p className="text-xs font-mono mt-1 text-gray-500">NO. INV-2023-8821</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                                        <div className="text-sm space-y-1">
                                            <p><span className="font-bold">致:</span> 张三先生/女士 (Mr./Ms. Zhang)</p>
                                            <p><span className="font-bold">地址:</span> 幸福小区 2栋 101室</p>
                                        </div>
                                        <div className="text-sm md:text-right space-y-1">
                                            <p><span className="font-bold">日期:</span> 2023年11月05日</p>
                                            <p><span className="font-bold">账期:</span> 2023/10/01 - 2023/10/31</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Body Table */}
                                <div className="flex-1">
                                    <table className="w-full text-sm mb-8">
                                        <thead>
                                            <tr className="border-b border-black">
                                                <th className="text-left py-2 font-bold w-1/3">收费项目 (Item)</th>
                                                <th className="text-left py-2 font-bold">计费模式 (Calculation)</th>
                                                <th className="text-right py-2 font-bold hidden sm:table-cell">单价</th>
                                                <th className="text-right py-2 font-bold hidden sm:table-cell">优惠 (Disc.)</th>
                                                <th className="text-right py-2 font-bold">小计 (Subtotal)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="font-mono">
                                            <tr className="border-b border-gray-200">
                                                <td className="py-4 pr-2">
                                                    <p className="font-bold font-sans">物业管理费</p>
                                                    <p className="text-xs text-gray-500 font-sans mt-0.5">10月常规物业服务</p>
                                                </td>
                                                <td className="py-4 text-gray-600">2.50元/㎡ × 100㎡</td>
                                                <td className="py-4 text-right hidden sm:table-cell">250.00</td>
                                                <td className="py-4 text-right hidden sm:table-cell">-0.00</td>
                                                <td className="py-4 text-right font-bold">250.00</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="py-4 pr-2">
                                                    <p className="font-bold font-sans">公共能耗费</p>
                                                    <p className="text-xs text-gray-500 font-sans mt-0.5">电梯及走廊照明分摊</p>
                                                </td>
                                                <td className="py-4 text-gray-600">固定收费</td>
                                                <td className="py-4 text-right hidden sm:table-cell">15.00</td>
                                                <td className="py-4 text-right hidden sm:table-cell">-0.00</td>
                                                <td className="py-4 text-right font-bold">15.00</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="py-4 pr-2">
                                                    <p className="font-bold font-sans">垃圾处理费</p>
                                                    <p className="text-xs text-gray-500 font-sans mt-0.5">生活垃圾清运</p>
                                                </td>
                                                <td className="py-4 text-gray-600">按户收费</td>
                                                <td className="py-4 text-right hidden sm:table-cell">10.00</td>
                                                <td className="py-4 text-right hidden sm:table-cell">-5.00</td>
                                                <td className="py-4 text-right font-bold">5.00</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Totals */}
                                    <div className="flex justify-end mb-12">
                                        <div className="w-full sm:w-2/3 md:w-1/2 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">合计金额 (Total):</span>
                                                <span className="font-mono">¥275.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">折扣优惠 (Discount):</span>
                                                <span className="font-mono text-red-600">- ¥5.00</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-black mt-2">
                                                <span className="font-bold text-lg">实收金额 (Net):</span>
                                                <span className="font-mono font-bold text-2xl">¥270.00</span>
                                            </div>
                                            <div className="text-right pt-2">
                                                <p className="text-xs text-gray-500">大写: 人民币贰佰柒拾元整</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-8 border-t-2 border-gray-100 relative">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-xs text-gray-500">
                                        <div>
                                            <p className="font-bold text-black mb-1">备注说明:</p>
                                            <p>1. 请于每月10日前完成缴费，逾期将产生滞纳金。</p>
                                            <p>2. 如对账单有疑问，请联系物业管理处：010-12345678。</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-black mb-1">收款账户信息:</p>
                                            <p>开户行: 中国工商银行某某支行</p>
                                            <p>账号: 6222 0000 0000 0000</p>
                                            <p>户名: 星河物业管理有限公司</p>
                                        </div>
                                    </div>

                                    {/* Stamp / Seal Background Graphic Approximation */}
                                    <div className="absolute right-4 bottom-4 md:right-10 md:bottom-10 opacity-80 pointer-events-none mix-blend-multiply rotate-[-12deg] z-0">
                                        <div className="w-24 h-24 md:w-32 md:h-32 border-[3px] md:border-4 border-red-600 rounded-full flex flex-col items-center justify-center text-red-600 relative overflow-hidden">
                                            <div className="text-center z-10 p-2">
                                                <div className="text-xs md:text-xl font-black whitespace-nowrap">财务专用章</div>
                                                <div className="text-[6px] md:text-[8px] mt-0.5">Finance Dept.</div>
                                                <div className="mt-1 md:mt-2 text-[6px] md:text-[8px] font-mono">2023.11.05</div>
                                            </div>
                                        </div>
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
