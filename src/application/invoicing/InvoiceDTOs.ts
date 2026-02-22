export interface InvoiceDTO {
    id: string;
    billVersionId: string;
    houseId: string;
    billingPeriod: string;
    status: string;
    totalAmount: number;
    createdAt: Date;
    lineItems: InvoiceLineItemDTO[];
}

export interface InvoiceLineItemDTO {
    id: string;
    houseIdentifier: string;
    ownerName: string;
    amount: number;
}
