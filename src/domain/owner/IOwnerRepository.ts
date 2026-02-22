import { Owner } from './Owner';

export interface IOwnerRepository {
    findById(id: string): Promise<Owner | null>;
    findByCompanyId(companyId: string): Promise<Owner[]>;
    save(owner: Owner): Promise<void>;
    delete(id: string): Promise<void>;
}
