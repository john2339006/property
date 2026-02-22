import { Invoice } from './Invoice';

export interface IInvoiceRepository {
    findById(id: string): Promise<Invoice | null>;
    findByPeriod(companyId: string, billingPeriod: string): Promise<Invoice[]>;
    findByHouseId(houseId: string): Promise<Invoice[]>;
    findByBillVersionId(billVersionId: string): Promise<Invoice | null>;
    save(invoice: Invoice): Promise<void>;
}
