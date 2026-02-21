import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import Link from "next/link";

export default function PropertiesPage() {
  const headers = [
    "", // Checkbox
    "房屋编号",
    "楼栋 - 单元 - 门牌号",
    "面积 (㎡)",
    "当前业主",
    "状态",
    "管理开始日期",
    "操作",
  ];

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
          <span className="hover:text-text-main cursor-pointer">房产管理</span>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">房屋列表</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Page Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight">
                房屋列表
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                管理所有房产单元信息，包括状态、业主和变更历史。
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg shadow-sm transition-all text-sm font-medium">
              <span className="material-symbols-outlined text-[20px]">add</span>
              新增房屋
            </button>
          </div>

          {/* Filters & Search Card */}
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border-light dark:border-border-dark shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Search Input */}
              <div className="space-y-1.5 col-span-1 lg:col-span-1">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  搜索
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main dark:text-white placeholder:text-text-secondary/60"
                    placeholder="请输入门牌号搜索"
                    type="text"
                  />
                </div>
              </div>
              {/* Filter: Building */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  楼栋
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main dark:text-white appearance-none cursor-pointer">
                    <option>全部楼栋</option>
                    <option>A座 (商业)</option>
                    <option>B座 (住宅)</option>
                    <option>C座 (住宅)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
              {/* Filter: Unit */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  单元
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main dark:text-white appearance-none cursor-pointer">
                    <option>全部单元</option>
                    <option>1单元</option>
                    <option>2单元</option>
                    <option>3单元</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
              {/* Filter: Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  房屋状态
                </label>
                <div className="relative">
                  <select className="w-full pl-3 pr-10 py-2.5 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main dark:text-white appearance-none cursor-pointer">
                    <option>全部状态</option>
                    <option>已售</option>
                    <option>未售</option>
                    <option>非激活</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
            {/* Action Buttons for Filters */}
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-border-light dark:border-border-dark">
              <button className="px-4 py-2 text-sm font-medium text-text-secondary bg-transparent hover:text-text-main hover:bg-background-light dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  restart_alt
                </span>
                重置
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg shadow-sm transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  search
                </span>
                查询
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="flex flex-col">
            <DataTable headers={headers}>
              {/* Row 1 */}
              <tr className="hover:bg-primary-light/30 dark:hover:bg-primary/5 transition-colors group">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-border-light text-primary focus:ring-primary/20 bg-surface-light"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-text-main dark:text-white font-mono">
                  H-2023001
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-text-main dark:text-white">
                      A座 - 1单元
                    </span>
                    <span className="text-xs text-text-secondary">1001室</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-text-secondary">
                  128.5
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      张
                    </div>
                    <span className="text-text-main dark:text-white">张三</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    已售
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary font-mono">
                  2023-01-15
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href="/properties/H-2023001"
                      className="text-primary hover:text-primary-hover font-medium text-xs"
                    >
                      编辑
                    </Link>
                    <Link
                      href="/properties/H-2023001"
                      className="text-text-secondary hover:text-text-main font-medium text-xs"
                    >
                      详情
                    </Link>
                    <button className="text-text-secondary hover:text-text-main font-medium text-xs">
                      历史
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-primary-light/30 dark:hover:bg-primary/5 transition-colors group">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-border-light text-primary focus:ring-primary/20 bg-surface-light"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-text-main dark:text-white font-mono">
                  H-2023002
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-text-main dark:text-white">
                      A座 - 1单元
                    </span>
                    <span className="text-xs text-text-secondary">1002室</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-text-secondary">
                  128.5
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                      李
                    </div>
                    <span className="text-text-main dark:text-white">李四</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    已售
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary font-mono">
                  2023-02-10
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-primary hover:text-primary-hover font-medium text-xs">
                      编辑
                    </button>
                    <button className="text-text-secondary hover:text-text-main font-medium text-xs">
                      详情
                    </button>
                    <button className="text-text-secondary hover:text-text-main font-medium text-xs">
                      历史
                    </button>
                  </div>
                </td>
              </tr>
            </DataTable>
            {/* Pagination */}
            <div className="bg-surface-light dark:bg-surface-dark px-6 py-4 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl border-x border-b">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>每页显示</span>
                <select className="form-select py-1 pl-2 pr-8 text-sm border-border-light dark:border-border-dark rounded bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary">
                  <option>50</option>
                  <option>100</option>
                  <option>200</option>
                </select>
                <span>条</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded text-text-secondary hover:text-primary disabled:opacity-50">
                  <span className="material-symbols-outlined text-[20px]">
                    first_page
                  </span>
                </button>
                <button className="p-1 rounded text-text-secondary hover:text-primary disabled:opacity-50">
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                <div className="flex items-center gap-1 mx-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-background-light dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-background-light dark:hover:bg-gray-800 text-sm font-medium transition-colors">
                    3
                  </button>
                  <span className="text-text-secondary text-xs px-1">...</span>
                </div>
                <button className="p-1 rounded text-text-secondary hover:text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
                <button className="p-1 rounded text-text-secondary hover:text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    last_page
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
