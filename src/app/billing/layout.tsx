import Sidebar from "@/components/Sidebar";

export default function BillingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background-light dark:bg-background-dark">
                {children}
            </main>
        </div>
    );
}
