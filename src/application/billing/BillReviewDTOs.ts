export interface OverrideBillInput {
    billId: string;
    newAmount: number;
    reason: string;
    createdBy: string;
}

export interface OverrideBillOutput {
    isSuccess: boolean;
    error?: string;
    finalAmount: number;
}

export interface GetBillsByPeriodInput {
    companyId: string;
    billingPeriod: string;
}

export interface BillDTO {
    id: string;
    houseId: string;
    billingPeriod: string;
    calculatedAmount: number;
    discountApplied: number;
    overriddenAmount: number | null;
    finalAmount: number;
    isOverridden: boolean;
}
