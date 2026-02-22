export abstract class Entity<IdType = string> {
    protected readonly _id: IdType;

    protected constructor(id: IdType) {
        this._id = id;
    }

    get id(): IdType {
        return this._id;
    }

    equals(other: Entity<IdType>): boolean {
        if (other === null || other === undefined) return false;
        if (!(other instanceof Entity)) return false;
        return this._id === other._id;
    }
}
