import Header from "@/components/Header";
import KPICard from "@/components/KPICard";

export default function Dashboard() {
  return (
    <>
      <Header>
        <nav className="hidden sm:flex items-center text-sm font-medium text-text-secondary">
          <span className="hover:text-text-main cursor-pointer">首页</span>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="hover:text-text-main cursor-pointer">财务管理</span>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">财务看板</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6 pb-10">
          {/* Page Title & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-text-main leading-tight">
                财务统计看板
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                实时监控财务收支状况
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-surface-light border border-border-light text-text-main text-sm font-medium rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm min-w-[160px] cursor-pointer dark:bg-surface-dark dark:border-border-dark dark:text-white">
                  <option>2023年年度</option>
                  <option>2024年第一季度</option>
                  <option>2024年3月</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
                  <span className="material-symbols-outlined text-lg">
                    calendar_month
                  </span>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm shadow-blue-200 transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                <span>导出报表</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="总应收金额"
              value="¥ 12,450,000"
              subValue=".00"
              icon="account_balance_wallet"
              trend="同比 +12.5%"
              trendUp={true}
              iconColorClass="text-primary"
              iconBgClass="bg-blue-50 dark:bg-blue-900/20"
            />
            <KPICard
              title="已收金额"
              value="¥ 10,200,000"
              icon="check_circle"
              trend="收缴率 82%"
              trendUp={true}
              iconColorClass="text-success"
              iconBgClass="bg-emerald-50 dark:bg-emerald-900/20"
            />
            <KPICard
              title="欠费金额"
              value="¥ 2,250,000"
              icon="error"
              trend="涉及 142 户业主"
              trendUp={false} // actually trend is just text, but let's use red for warning
              iconColorClass="text-danger"
              iconBgClass="bg-red-50 dark:bg-red-900/20"
            />
            <KPICard
              title="优惠总额"
              value="¥ 15,000"
              icon="percent"
              trend="占总应收 0.12%"
              trendUp={true} // neutral
              iconColorClass="text-warning"
              iconBgClass="bg-amber-50 dark:bg-amber-900/20"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line Chart Placeholder */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm lg:col-span-2 flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-main dark:text-white">
                  收费趋势 (近12个月)
                </h3>
                {/* Legend */}
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-border-light"></div>
                    <span className="text-text-secondary">应收金额</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <span className="text-text-main dark:text-white">实收金额</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full relative bg-background-light/50 dark:bg-background-dark/50 rounded flex items-center justify-center border border-dashed border-border-light dark:border-border-dark">
                 <span className="text-text-secondary">Chart Placeholder (Visual Only)</span>
              </div>
            </div>

            {/* Pie Chart Placeholder */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col h-[400px]">
              <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">
                费用结构占比
              </h3>
              <div className="flex-1 w-full relative bg-background-light/50 dark:bg-background-dark/50 rounded flex items-center justify-center border border-dashed border-border-light dark:border-border-dark">
                 <span className="text-text-secondary">Pie Chart Placeholder</span>
              </div>
            </div>
          </div>

          {/* Bottom Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Ranking List */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm lg:col-span-1 h-full">
               <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-main dark:text-white">楼栋收缴率排行</h3>
                <button className="text-primary text-sm font-medium hover:underline">查看全部</button>
              </div>
              <div className="flex flex-col gap-5">
                 {/* Item 1 */}
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                       <span className="font-bold text-text-main dark:text-white">A栋写字楼</span>
                       <span className="font-bold text-success">98%</span>
                    </div>
                    <div className="h-2 w-full bg-background-light dark:bg-gray-700 rounded-full overflow-hidden">
                       <div className="h-full bg-success rounded-full w-[98%]"></div>
                    </div>
                 </div>
                 {/* Item 2 */}
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                       <span className="font-bold text-text-main dark:text-white">B栋住宅</span>
                       <span className="font-bold text-primary">92%</span>
                    </div>
                    <div className="h-2 w-full bg-background-light dark:bg-gray-700 rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full w-[92%]"></div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Audit Table */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm lg:col-span-2 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-main dark:text-white">最近费用调整</h3>
                <button className="text-primary text-sm font-medium hover:underline">审计日志</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-border-light dark:border-border-dark text-xs text-text-secondary uppercase tracking-wider">
                          <th className="py-3 px-2 font-medium">时间</th>
                          <th className="py-3 px-2 font-medium">操作人</th>
                          <th className="py-3 px-2 font-medium">调整类型</th>
                          <th className="py-3 px-2 font-medium text-right">金额</th>
                          <th className="py-3 px-2 font-medium">原因</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm text-text-main dark:text-gray-300">
                       <tr className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                          <td className="py-3 px-2 whitespace-nowrap text-text-secondary">2023-12-05 14:30</td>
                          <td className="py-3 px-2">王小明</td>
                          <td className="py-3 px-2"><span className="bg-red-50 text-danger px-2 py-0.5 rounded text-xs font-bold">减免</span></td>
                          <td className="py-3 px-2 text-right font-medium text-danger">- ¥50.00</td>
                          <td className="py-3 px-2 text-text-secondary">滞纳金减免</td>
                       </tr>
                       {/* More rows... */}
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
