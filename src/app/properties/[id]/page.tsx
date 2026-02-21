import Header from "@/components/Header";
import VersionTimeline from "@/components/VersionTimeline";
import Link from "next/link";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const timelineEvents = [
    {
      version: "V2.0",
      date: "2023-11-05 09:20",
      operator: "李管理员",
      icon: "verified",
      isCurrent: true,
      details: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              面积
            </span>
            <span className="font-mono font-medium text-text-main dark:text-white">
              128.50 ㎡
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              状态
            </span>
            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              已售
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-text-secondary block mb-1">
              变更内容
            </span>
            <span className="text-text-main dark:text-white">
              更新业主信息，添加共有人&quot;王美丽&quot;
            </span>
          </div>
        </div>
      ),
    },
    {
      version: "V1.5",
      date: "2023-06-12 14:15",
      operator: "张销售",
      icon: "edit_document",
      details: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              面积
            </span>
            <span className="font-mono font-medium text-text-main dark:text-white">
              128.50 ㎡
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              状态
            </span>
            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              已售
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-text-secondary block mb-1">
              变更内容
            </span>
            <span className="text-text-main dark:text-white">
              房屋售出，登记业主&quot;张三&quot;
            </span>
          </div>
        </div>
      ),
    },
    {
      version: "V1.1",
      date: "2023-01-20 10:00",
      operator: "系统导入",
      icon: "architecture",
      details: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              面积
            </span>
            <span className="font-mono font-medium text-text-main dark:text-white">
              128.50 ㎡
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              状态
            </span>
            <span className="inline-flex items-center gap-1 text-text-secondary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              未售
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-text-secondary block mb-1">
              变更内容
            </span>
            <span className="text-text-main dark:text-white">
              修正面积测量数据，从 128.00 调整为 128.50
            </span>
          </div>
        </div>
      ),
    },
    {
      version: "V1.0",
      date: "2023-01-10 14:30",
      operator: "系统管理员",
      icon: "add_circle",
      details: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              面积
            </span>
            <span className="font-mono font-medium text-text-main dark:text-white">
              128.00 ㎡
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block mb-1">
              状态
            </span>
            <span className="inline-flex items-center gap-1 text-text-secondary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              未售
            </span>
          </div>
          <div className="md:col-span-2">
            <span className="text-xs text-text-secondary block mb-1">
              变更内容
            </span>
            <span className="text-text-main dark:text-white">
              房屋档案创建
            </span>
          </div>
        </div>
      ),
    },
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
          <Link
            href="/properties"
            className="hover:text-text-main cursor-pointer"
          >
            房产管理
          </Link>
          <span className="material-symbols-outlined text-border-dark mx-2 text-base">
            chevron_right
          </span>
          <span className="text-text-main font-bold">房屋详情</span>
        </nav>
      </Header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight flex items-center gap-3">
                  {id}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    已售
                  </span>
                </h1>
                <p className="text-text-secondary text-sm mt-1">
                  创建时间: 2023-01-10 14:30 | 上次更新: 2023-11-05 09:20
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white px-4 py-2 rounded-lg shadow-sm hover:bg-background-light dark:hover:bg-gray-800 transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">
                  print
                </span>
                打印
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg shadow-sm transition-all text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">
                  edit
                </span>
                编辑房屋
              </button>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-background-light dark:bg-gray-800/50">
              <h2 className="font-bold text-lg text-text-main dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                当前信息
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    楼栋
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">
                      apartment
                    </span>
                    <span className="text-base font-medium text-text-main dark:text-white">
                      A座 (商业)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    单元
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">
                      meeting_room
                    </span>
                    <span className="text-base font-medium text-text-main dark:text-white">
                      1单元
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    门牌号
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">
                      door_front
                    </span>
                    <span className="text-base font-medium text-text-main dark:text-white">
                      1001室
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    面积 (㎡)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">
                      square_foot
                    </span>
                    <span className="text-base font-mono font-medium text-text-main dark:text-white">
                      128.50
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    当前业主
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        张
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-white">
                        张三
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        王
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-white">
                        王美丽 (共有人)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    备注信息
                  </span>
                  <p className="text-sm text-text-main dark:text-gray-300 leading-relaxed bg-background-light dark:bg-background-dark p-3 rounded-lg border border-border-light dark:border-border-dark">
                    该房屋位于高层，采光良好。业主已缴纳全年物业费。上次维修记录显示空调系统已检修。
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    管理信息
                  </span>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">管理开始日期:</span>
                      <span className="font-mono text-text-main dark:text-white">
                        2023-01-15
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">合同到期日期:</span>
                      <span className="font-mono text-text-main dark:text-white">
                        2025-01-14
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">物业费标准:</span>
                      <span className="font-mono text-text-main dark:text-white">
                        2.5 元/㎡/月
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-background-light dark:bg-gray-800/50">
              <h2 className="font-bold text-lg text-text-main dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  history
                </span>
                变更历史
              </h2>
              <button className="text-sm text-primary hover:text-primary-hover font-medium">
                查看完整日志
              </button>
            </div>
            <div className="p-6">
              <VersionTimeline events={timelineEvents} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
