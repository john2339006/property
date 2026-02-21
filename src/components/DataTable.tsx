export default function DataTable({
  headers,
  children,
}: {
  headers: React.ReactNode[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden flex flex-col">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-background-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark text-xs font-semibold text-text-secondary uppercase tracking-wider">
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark text-sm">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
