import { Company } from './Company';

export interface ICompanyRepository {
    findById(id: string): Promise<Company | null>;
    findAll(): Promise<Company[]>;
    save(company: Company): Promise<void>;
    delete(id: string): Promise<void>;
}
