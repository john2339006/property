export default function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark h-16 flex items-center justify-between px-6 lg:px-8 z-10 shrink-0">
      {/* Breadcrumbs / Page Title Area */}
      <div className="flex items-center">
        {children || (
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary text-sm flex items-center"
                >
                  <span className="material-symbols-outlined text-[18px] mr-1">
                    home
                  </span>
                  首页
                </a>
              </li>
            </ol>
          </nav>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-primary hover:bg-background-light dark:hover:bg-gray-800 rounded-full transition-colors">
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border border-white dark:border-surface-dark"></span>
        </button>
        <div className="h-6 w-px bg-border-light dark:bg-border-dark"></div>
        <span className="text-sm font-medium text-text-secondary">
          兴业物业管理有限公司
        </span>
      </div>
    </header>
  );
}
