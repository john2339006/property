import Header from "@/components/Header";
import Link from "next/link";

export default async function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          <span className="hover:text-text-main cursor-pointer">业主管理</span>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">业主详情</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
          {/* Profile Header */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary border border-blue-100 dark:border-blue-800">
                <span className="material-symbols-outlined text-3xl">
                  person
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-text-main dark:text-white text-2xl font-bold tracking-tight">
                    张三
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold border border-blue-100 dark:border-blue-800/50 uppercase tracking-wide">
                    个人业主
                  </span>
                </div>
                <p className="text-text-secondary text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">
                    badge
                  </span>
                  ID: {id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none h-10 px-4 rounded-lg border border-border-light dark:border-border-dark text-text-main dark:text-white font-bold text-sm bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                下载档案
              </button>
              <button className="flex-1 md:flex-none h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
                编辑业主信息
              </button>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-background-light dark:bg-gray-800/50">
              <h3 className="text-text-main dark:text-white font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  id_card
                </span>
                基本信息
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  证件号码
                </span>
                <div className="flex items-center gap-2 group">
                  <span className="text-text-main dark:text-white font-medium text-base font-mono">
                    110101********1234
                  </span>
                  <button
                    className="text-text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                    title="显示完整号码"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  纳税人识别号
                </span>
                <span className="text-text-main dark:text-white font-medium text-base font-mono">
                  911101085512345678
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  联系电话
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-text-main dark:text-white font-medium text-base font-mono">
                    138****8000
                  </span>
                  <button
                    className="text-text-secondary hover:text-primary transition-colors"
                    title="显示完整号码"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  邮箱
                </span>
                <span className="text-text-main dark:text-white font-medium text-base">
                  zhangsan@example.com
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  发票抬头
                </span>
                <span className="text-text-main dark:text-white font-medium text-base">
                  张三
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  创建时间
                </span>
                <span className="text-text-main dark:text-white font-medium text-base font-mono">
                  2023-01-15 14:30
                </span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 2: Associated Properties */}
            <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden flex flex-col h-full">
              <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-background-light dark:bg-gray-800/50">
                <h3 className="text-text-main dark:text-white font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    apartment
                  </span>
                  关联房屋
                </h3>
                <span className="bg-background-light dark:bg-gray-700 text-text-secondary dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-md">
                  2 套
                </span>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background-light dark:bg-gray-800/50 text-xs uppercase text-text-secondary border-b border-border-light dark:border-border-dark">
                      <th className="px-6 py-3 font-semibold tracking-wider">
                        房屋地址
                      </th>
                      <th className="px-6 py-3 font-semibold tracking-wider text-right">
                        建筑面积
                      </th>
                      <th className="px-6 py-3 font-semibold tracking-wider text-center">
                        当前状态
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">
                              home
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-text-main dark:text-white text-sm">
                              阳光花园 A栋-1单元-101
                            </p>
                            <p className="text-xs text-text-secondary">住宅</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-main dark:text-gray-300 font-mono text-right">
                        120.50 m²
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          自住
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">
                              storefront
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-text-main dark:text-white text-sm">
                              时代广场 B座-商铺-05
                            </p>
                            <p className="text-xs text-text-secondary">商业</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-main dark:text-gray-300 font-mono text-right">
                        45.00 m²
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          出租
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Version History */}
            <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden flex flex-col h-full">
              <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-background-light dark:bg-gray-800/50">
                <h3 className="text-text-main dark:text-white font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    history
                  </span>
                  变更历史
                </h3>
                <button className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors">
                  查看全部
                </button>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background-light dark:bg-gray-800/50 text-xs uppercase text-text-secondary border-b border-border-light dark:border-border-dark">
                      <th className="px-4 py-3 font-semibold tracking-wider">
                        版本
                      </th>
                      <th className="px-4 py-3 font-semibold tracking-wider">
                        状态
                      </th>
                      <th className="px-4 py-3 font-semibold tracking-wider">
                        修改内容
                      </th>
                      <th className="px-4 py-3 font-semibold tracking-wider text-right">
                        操作人
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {/* Current Version */}
                    <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-main dark:text-white">
                            V3.0
                          </span>
                          <span className="text-xs text-text-secondary">
                            2023-10-01
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
                          当前版本
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p
                          className="text-sm text-text-main dark:text-gray-300 line-clamp-1"
                          title="电话号码变更"
                        >
                          电话号码变更
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-text-secondary">
                            李四 (管理员)
                          </span>
                          <div className="w-6 h-6 rounded-full bg-background-light dark:bg-gray-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[14px]">
                              face
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Past Version */}
                    <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors opacity-75">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-text-main dark:text-white">
                            V2.0
                          </span>
                          <span className="text-xs text-text-secondary">
                            2023-06-15
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-background-light dark:bg-gray-700 text-text-secondary border border-border-light dark:border-border-dark uppercase tracking-wide">
                          已失效
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p
                          className="text-sm text-text-main dark:text-gray-300 line-clamp-1"
                          title="邮箱地址更新"
                        >
                          邮箱地址更新
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-text-secondary">
                            王五
                          </span>
                          <div className="w-6 h-6 rounded-full bg-background-light dark:bg-gray-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[14px]">
                              face
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Initial Version */}
                    <tr className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors opacity-75">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-text-main dark:text-white">
                            V1.0
                          </span>
                          <span className="text-xs text-text-secondary">
                            2023-01-15
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-background-light dark:bg-gray-700 text-text-secondary border border-border-light dark:border-border-dark uppercase tracking-wide">
                          初始版本
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p
                          className="text-sm text-text-main dark:text-gray-300 line-clamp-1"
                          title="业主档案创建"
                        >
                          业主档案创建
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-text-secondary">
                            系统自动
                          </span>
                          <div className="w-6 h-6 rounded-full bg-background-light dark:bg-gray-700 flex items-center justify-center text-text-secondary">
                            <span className="material-symbols-outlined text-[14px]">
                              smart_toy
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
