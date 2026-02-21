"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

const menuItems = [
  { name: "管理中心", href: "/", icon: "dashboard" },
  { name: "操作台", href: "/operator", icon: "support_agent" },
  { name: "房产管理", href: "/properties", icon: "domain" },
  { name: "业主管理", href: "/owners", icon: "people" },
  { name: "数据导入", href: "/import-validation", icon: "cloud_upload" },
  { name: "费用配置", href: "/billing/config", icon: "payments" },
  { name: "账单与发票", href: "/billing", icon: "receipt_long" },
  { name: "公司档案", href: "/company", icon: "business" },
  { name: "用户权限", href: "/users", icon: "admin_panel_settings" },
  { name: "审计日志", href: "/audit-logs", icon: "security" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col z-20 transition-all duration-300 h-full">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border-light dark:border-border-dark shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
            <span className="material-symbols-outlined text-xl">apartment</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight text-text-main dark:text-white">
            兴业物业
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                isActive
                  ? "bg-primary-light text-primary dark:bg-primary/20"
                  : "text-text-secondary hover:bg-background-light dark:hover:bg-gray-800"
              )}
            >
              <span
                className={clsx(
                  "material-symbols-outlined text-[22px] transition-colors",
                  isActive
                    ? "fill-current"
                    : "group-hover:text-primary"
                )}
              >
                {item.icon}
              </span>
              <span
                className={clsx(
                  "text-sm font-medium",
                  isActive
                    ? "font-bold"
                    : "group-hover:text-text-main dark:group-hover:text-white"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile (Bottom Sidebar) */}
      <div className="border-t border-border-light dark:border-border-dark p-4 shrink-0">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <div className="relative">
            <Image
              alt="Administrator profile picture"
              className="w-9 h-9 rounded-full object-cover border border-border-light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2TZfpP6uQikDy3gGJj5hSWjB8ArMop0jCq4WGJkf9lvvhlr5W6bN9nxOvo_wzvJMlYhze6Q5HgK2UGOa5F4jYnPWXCFpE4C1tITE2wjHPV0v6C26NLaWBKQQzWcxV4LzFBILgSQecr-1CLAQJPa210UB5LY38RIdabt_abfqPKWlf_OT0UqWeewyVO1o4y3_JyOzljW7r60WXhIrlZTUaX3EXJpfVSCfYBEdZKTv1jgCDKlXPkk1Fgkuv5dr_D9a23w4r7khRqCY"
              width={36}
              height={36}
              unoptimized
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white dark:border-gray-800"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-text-main dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-text-secondary truncate">系统管理员</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
