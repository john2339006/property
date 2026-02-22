export interface CalculateSingleBillInput {
    houseId: string;
}

export interface CalculateSingleBillOutput {
    calculatedAmount: number;
    discountApplied: number;
    finalAmount: number;
    isSuccess: boolean;
    error?: string;
}

export interface GenerateBillsForPeriodInput {
    companyId: string;
    billingPeriod: string; // e.g., '2026-02'
    createdBy: string;
}

export interface GenerateBillsForPeriodOutput {
    billsGeneratedCount: number;
    errors: string[];
}
