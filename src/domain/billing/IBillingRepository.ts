import { BillingType } from './BillingType';
import { Discount } from './Discount';
import { Bill } from './Bill';

export interface IBillingTypeRepository {
    findById(id: string): Promise<BillingType | null>;
    findByCompanyId(companyId: string): Promise<BillingType[]>;
    save(billingType: BillingType): Promise<void>;
    delete(id: string): Promise<void>;
}

export interface IDiscountRepository {
    findById(id: string): Promise<Discount | null>;
    findByHouseId(houseId: string): Promise<Discount[]>;
    findByCompanyId(companyId: string): Promise<Discount[]>;
    save(discount: Discount): Promise<void>;
    delete(id: string): Promise<void>;
}

export interface IBillRepository {
    findById(id: string): Promise<Bill | null>;
    findByHouseId(houseId: string): Promise<Bill[]>;
    findByPeriod(companyId: string, billingPeriod: string): Promise<Bill[]>;
    save(bill: Bill): Promise<void>;
    delete(id: string): Promise<void>;
}
