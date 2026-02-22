import { IHouseRepository } from '@/domain/house/IHouseRepository';
import { House } from '@/domain/house/House';
import { ImportResult } from '@/domain/import-export/ImportResult';
import { UniqueId } from '@/domain/shared/UniqueId';

export class ProcessHouseImportUseCase {
    constructor(private readonly houseRepository: IHouseRepository) { }

    async execute(companyId: string, csvData: string): Promise<ImportResult> {
        const result = new ImportResult();

        // Basic CSV parsing. In a real app we would use a robust parser like papaparse or csv-parse.
        const lines = csvData.split(/\r?\n/).filter(line => line.trim() !== '');

        if (lines.length === 0) {
            result.addError(0, 'File is empty');
            return result;
        }

        // Assuming row 0 is headers: company_id, building, unit, area, default_billing_type
        // Note: For this MVP, we ignore headers and assume strict ordering from row 1 onwards.
        // Or we can just read column by column. Let's do a simple index check.
        // Expected Format: building, unit, area, ownerId, defaultBillingType, status

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

        // Find indices
        const buildingIdx = headers.indexOf('building');
        const unitIdx = headers.indexOf('unit');
        const areaIdx = headers.indexOf('area');

        if (buildingIdx === -1 || unitIdx === -1 || areaIdx === -1) {
            result.addError(0, 'Missing required headers: building, unit, area');
            return result;
        }

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const columns = line.split(',').map(c => c.trim());

            try {
                const building = columns[buildingIdx];
                const unit = columns[unitIdx];
                const areaStr = columns[areaIdx];

                if (!building || !unit || !areaStr) {
                    throw new Error('Missing required data fields');
                }

                const area = parseFloat(areaStr);
                if (isNaN(area) || area <= 0) {
                    throw new Error('Invalid area value');
                }

                const houseId = UniqueId.create().value;
                const versionId = UniqueId.create().value;
                const now = new Date();

                const house = House.create(
                    houseId,
                    {
                        companyId: companyId,
                        status: 'NOT_SOLD',
                        managementStartDate: now,
                        managementEndDate: null,
                        currentVersionId: null,
                    },
                    {
                        versionId: versionId,
                        versionProps: {
                            buildingNo: building,
                            unitNo: unit,
                            levelNo: '1',
                            doorNo: unit,
                            areaSqm: area,
                            effectiveFrom: now,
                        }
                    }
                );

                await this.houseRepository.save(house);
                result.addSuccess();

            } catch (error: any) {
                result.addError(i + 1, error.message || 'Unknown parsing error');
            }
        }

        return result;
    }
}
