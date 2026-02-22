import { PrismaClient } from '@prisma/client';

export class GenerateExportUseCase {
    constructor(private readonly prisma: PrismaClient) { }

    async execute(companyId: string, type: string): Promise<string> {
        let csvContent = "";

        if (type.toUpperCase() === 'HOUSES') {
            const houses = await this.prisma.house.findMany({
                where: { company_id: companyId },
                include: {
                    versions: {
                        where: { is_latest: true }
                    }
                }
            });

            // Headers
            csvContent += "ID,Building,Unit,Level,Door,Area,Status,Management_Start\n";

            for (const h of houses) {
                const v = h.versions[0];
                if (v) {
                    const row = [
                        h.id,
                        v.building_no,
                        v.unit_no,
                        v.level_no,
                        v.door_no,
                        v.area_sqm,
                        h.status,
                        h.management_start_date.toISOString().split('T')[0]
                    ];
                    csvContent += row.join(",") + "\n";
                }
            }
        } else if (type.toUpperCase() === 'INVOICES') {
            const invoices = await this.prisma.invoice.findMany({
                where: {
                    house: { company_id: companyId }
                },
                include: { line_items: true }
            });

            // Headers
            csvContent += "Invoice_ID,House_Identifier,Owner_Name,Amount,Status,Billing_Period,Created_At\n";

            for (const inv of invoices) {
                const amount = inv.line_items.reduce((sum, item) => sum + item.amount, 0);
                // For simplicity, just use the first line item to get the names, since it's grouped by house.
                const firstItem = inv.line_items[0];
                const identifier = firstItem ? firstItem.house_identifier : 'N/A';
                const owner = firstItem ? firstItem.owner_name : 'N/A';

                const row = [
                    inv.id,
                    identifier,
                    owner,
                    amount.toFixed(2),
                    inv.status,
                    inv.billing_period,
                    inv.created_at.toISOString().split('T')[0]
                ];
                csvContent += row.join(",") + "\n";
            }
        } else {
            throw new Error(`Export type ${type} not supported.`);
        }

        return csvContent;
    }
}
