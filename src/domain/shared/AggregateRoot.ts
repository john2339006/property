import { Entity } from './Entity';

export abstract class AggregateRoot<IdType = string> extends Entity<IdType> {
    protected constructor(id: IdType) {
        super(id);
    }
}
