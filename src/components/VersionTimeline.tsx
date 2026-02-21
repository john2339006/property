import clsx from "clsx";

export interface TimelineEvent {
  version: string;
  date: string;
  operator: string;
  icon: string;
  details: React.ReactNode;
  isCurrent?: boolean;
}

export default function VersionTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative space-y-8">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="relative pl-12 group">
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-border-light dark:bg-border-dark" />
            )}

            {/* Icon */}
            <div
              className={clsx(
                "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 bg-surface-light dark:bg-surface-dark",
                event.isCurrent
                  ? "border-primary text-primary"
                  : "border-text-secondary text-text-secondary"
              )}
            >
              <span
                className={clsx(
                  "material-symbols-outlined",
                  event.isCurrent ? "text-xl" : "text-sm"
                )}
              >
                {event.icon}
              </span>
            </div>

            {/* Content Card */}
            <div
              className={clsx(
                "rounded-lg p-4 relative shadow-sm transition-colors border",
                event.isCurrent
                  ? "bg-background-light dark:bg-surface-dark border-primary/30"
                  : "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-gray-800"
              )}
            >
              {event.isCurrent && (
                <span className="absolute -top-3 right-4 px-2 py-0.5 bg-primary text-white text-xs rounded shadow-sm font-bold tracking-wide">
                  当前版本
                </span>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-text-main dark:text-white">
                    {event.version}
                  </span>
                  <span className="text-sm text-text-secondary font-mono">
                    {event.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="material-symbols-outlined text-base">
                    person
                  </span>
                  <span>操作人: {event.operator}</span>
                </div>
              </div>
              <div className="text-sm">{event.details}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
