import { House } from './House';

export interface IHouseRepository {
    findById(id: string): Promise<House | null>;
    findByCompanyId(companyId: string): Promise<House[]>;
    save(house: House): Promise<void>;
    delete(id: string): Promise<void>;
}
