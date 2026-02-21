import clsx from "clsx";

interface KPICardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: string;
  trend?: string;
  trendUp?: boolean; // true for positive/green, false for negative/red
  iconColorClass?: string;
  iconBgClass?: string;
}

export default function KPICard({
  title,
  value,
  subValue,
  icon,
  trend,
  trendUp = true,
  iconColorClass = "text-primary",
  iconBgClass = "bg-primary-light",
}: KPICardProps) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-soft hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-text-secondary text-sm font-medium">
            {title}
          </span>
          <h3 className="text-3xl font-extrabold text-text-main dark:text-white mt-1 tracking-tight">
            {value}
            {subValue && (
              <span className="text-lg text-text-secondary font-normal">
                {subValue}
              </span>
            )}
          </h3>
        </div>
        <div
          className={clsx(
            "p-2 rounded-lg flex items-center justify-center",
            iconBgClass,
            iconColorClass
          )}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      {trend && (
        <div
          className={clsx(
            "flex items-center gap-2 text-xs font-medium w-fit px-2 py-1 rounded",
            trendUp
              ? "text-success bg-green-50 dark:bg-green-900/20"
              : "text-danger bg-red-50 dark:bg-red-900/20"
          )}
        >
          <span className="material-symbols-outlined text-sm">
            {trendUp ? "trending_up" : "trending_down"}
          </span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
