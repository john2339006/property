export interface DashboardMetricsDTO {
    totalActiveHouses: number;
    totalPropertiesNotSold: number;
    financials: {
        totalExpectedRevenue: number; // All non-voided invoices
        totalCollectedRevenue: number; // All PAID invoices
        outstandingBalance: number;    // ISSUED invoices
    };
    recentInvoicesCount: number; // Invoices created in the last 30 days
}
