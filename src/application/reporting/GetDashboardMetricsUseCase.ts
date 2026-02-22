import { PrismaClient } from '@prisma/client';
import { DashboardMetricsDTO } from './ReportingDTOs';

export class GetDashboardMetricsUseCase {
    constructor(private readonly prisma: PrismaClient) { }

    async execute(companyId: string): Promise<DashboardMetricsDTO> {
        // 1. House Metrics
        const activeHousesCount = await this.prisma.house.count({
            where: {
                company_id: companyId,
                status: 'ACTIVE'
            }
        });

        const notSoldHousesCount = await this.prisma.house.count({
            where: {
                company_id: companyId,
                status: 'NOT_SOLD'
            }
        });

        // 2. Financial Metrics (Invoices)
        // Note: For a real app, this might be filtered by a specific period (e.g. current year).
        // Here we do all-time for simplicity of the MVP dashboard.
        const invoices = await this.prisma.invoice.findMany({
            where: {
                house: {
                    company_id: companyId
                }
            },
            include: {
                line_items: true
            }
        });

        let totalExpected = 0;
        let totalCollected = 0;
        let outstanding = 0;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        let recentInvoicesCount = 0;

        for (const invoice of invoices) {
            const amount = invoice.line_items.reduce((sum, item) => sum + item.amount, 0);

            if (invoice.status !== 'VOIDED') {
                totalExpected += amount;
            }

            if (invoice.status === 'PAID') {
                totalCollected += amount;
            } else if (invoice.status === 'ISSUED') {
                outstanding += amount;
            }

            if (invoice.created_at >= thirtyDaysAgo) {
                recentInvoicesCount++;
            }
        }

        return {
            totalActiveHouses: activeHousesCount,
            totalPropertiesNotSold: notSoldHousesCount,
            financials: {
                totalExpectedRevenue: totalExpected,
                totalCollectedRevenue: totalCollected,
                outstandingBalance: outstanding
            },
            recentInvoicesCount
        };
    }
}
