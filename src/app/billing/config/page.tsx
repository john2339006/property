import Header from "@/components/Header";
import Link from "next/link";

export default function BillingConfigPage() {
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
          <Link href="/billing" className="hover:text-text-main cursor-pointer">
            费用配置
          </Link>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">收费项目</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
        <div className="max-w-[1400px] mx-auto space-y-6 h-full flex flex-col">
          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight">
                收费项目管理
              </h1>
            </div>
            <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm font-semibold active:scale-95">
              <span className="material-symbols-outlined text-[20px]">add</span>
              新增收费项目
            </button>
          </div>

          {/* Layout: Left List / Right Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
            {/* Left: List of Billing Types */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Search in List */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                  filter_list
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-text-secondary"
                  placeholder="筛选收费项目..."
                  type="text"
                />
              </div>

              {/* List Items */}
              <div className="flex flex-col gap-3">
                {/* Item 1: Active & Selected */}
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border-2 border-primary shadow-sm cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold uppercase tracking-wider">
                    Selected
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          apartment
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white leading-tight">
                          物业管理费
                        </h3>
                        <span className="text-xs text-text-secondary">
                          按建筑面积计费
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20">
                      生效中
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-2xl font-bold text-text-main dark:text-white">
                      2.80
                    </span>
                    <span className="text-xs text-text-secondary font-medium">
                      元/m²/月
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-warning rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          local_parking
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white leading-tight">
                          地下停车费
                        </h3>
                        <span className="text-xs text-text-secondary">
                          固定月租
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20">
                      生效中
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-2xl font-bold text-text-main dark:text-white">
                      400.00
                    </span>
                    <span className="text-xs text-text-secondary font-medium">
                      元/月/位
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">
                          water_drop
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white leading-tight">
                          商业用水费
                        </h3>
                        <span className="text-xs text-text-secondary">
                          阶梯计费
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-background-light dark:bg-gray-700 px-2 py-1 text-xs font-medium text-text-secondary ring-1 ring-inset ring-text-secondary/10">
                      草稿
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-sm text-text-secondary font-medium">
                      三阶梯配置
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Config Detail */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Main Config Card */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                <div className="border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between bg-background-light dark:bg-gray-800/50">
                  <h3 className="font-bold text-lg text-text-main dark:text-white">
                    配置详情: 物业管理费
                  </h3>
                  <button className="text-primary hover:text-primary-hover text-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">
                      history
                    </span>
                    版本管理
                  </button>
                </div>
                <div className="p-6 flex flex-col gap-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        项目名称
                      </label>
                      <input
                        className="w-full bg-background-light dark:bg-surface-dark border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-primary focus:border-primary font-medium p-2.5 border"
                        type="text"
                        defaultValue="物业管理费"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        生效日期
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">
                          calendar_today
                        </span>
                        <input
                          className="w-full pl-10 bg-background-light dark:bg-surface-dark border-border-light dark:border-border-dark rounded-lg text-sm text-text-main dark:text-white focus:ring-primary focus:border-primary font-medium p-2.5 border"
                          type="date"
                          defaultValue="2023-10-01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border-light dark:border-border-dark"></div>

                  {/* Model Selection Tabs */}
                  <div className="flex flex-col gap-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      计费模式模型
                    </label>
                    <div className="flex p-1 bg-background-light dark:bg-gray-800 rounded-lg w-fit">
                      <button className="px-4 py-1.5 rounded-md text-sm font-bold bg-surface-light dark:bg-surface-dark text-primary shadow-sm transition-all border border-border-light dark:border-border-dark">
                        按面积计费 (Area)
                      </button>
                      <button className="px-4 py-1.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                        阶梯计费 (Tiered)
                      </button>
                      <button className="px-4 py-1.5 rounded-md text-sm font-medium text-text-secondary hover:text-text-main dark:hover:text-white transition-all">
                        固定金额 (Fixed)
                      </button>
                    </div>
                  </div>

                  {/* Area Model Content (Active) */}
                  <div className="bg-primary-light/20 border border-primary/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-primary">
                        square_foot
                      </span>
                      <h4 className="font-bold text-text-main dark:text-white">
                        按建筑面积计算
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white">
                          单价
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">
                            currency_yuan
                          </span>
                          <input
                            className="w-full pl-9 pr-16 py-2.5 bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark border rounded-lg text-text-main dark:text-white font-bold focus:ring-primary focus:border-primary"
                            type="number"
                            defaultValue="2.80"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs">
                            元/m²/月
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text-main dark:text-white">
                          用途类型
                        </label>
                        <select className="w-full py-2.5 bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark border rounded-lg text-text-main dark:text-white focus:ring-primary focus:border-primary text-sm px-3">
                          <option>商业办公 (Business)</option>
                          <option>住宅 (Residential)</option>
                          <option>商铺 (Retail)</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        info
                      </span>
                      公式: 费用 = 建筑面积 × 单价
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                    <button className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary font-medium text-sm hover:bg-surface-light dark:hover:bg-gray-700 transition-colors">
                      取消
                    </button>
                    <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">
                        save
                      </span>
                      保存配置
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Metadata Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                      <span className="material-symbols-outlined text-[20px]">
                        calculate
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-text-main dark:text-white">
                      关联公式
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    此收费项目将应用{" "}
                    <span className="font-mono text-xs bg-background-light dark:bg-gray-800 px-1 py-0.5 rounded border border-border-light dark:border-border-dark">
                      BASE_AREA_FORMULA_V2
                    </span>{" "}
                    计算逻辑。
                  </p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-warning">
                      <span className="material-symbols-outlined text-[20px]">
                        warning
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-text-main dark:text-white">
                      配置提醒
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    修改生效日期后，系统将在次月1日自动重新生成未结账单。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
