import { AggregateRoot } from '@/domain/shared/AggregateRoot';
import { HouseVersion, HouseVersionProps } from './HouseVersion';

export type HouseStatus = 'ACTIVE' | 'SOLD_NOT_ACTIVE' | 'NOT_SOLD';

export interface OwnershipRecord {
    id: string;
    houseId: string;
    ownerId: string;
}

export interface HouseProps {
    companyId: string;
    status: HouseStatus;
    managementStartDate: Date;
    managementEndDate: Date | null;
    currentVersionId: string | null;
}

export class House extends AggregateRoot<string> {
    private props: HouseProps;
    private _versions: HouseVersion[];
    private _ownerships: OwnershipRecord[];

    private constructor(id: string, props: HouseProps, versions: HouseVersion[] = [], ownerships: OwnershipRecord[] = []) {
        super(id);
        this.props = props;
        this._versions = versions;
        this._ownerships = ownerships;
    }

    get companyId(): string { return this.props.companyId; }
    get status(): HouseStatus { return this.props.status; }
    get managementStartDate(): Date { return this.props.managementStartDate; }
    get managementEndDate(): Date | null { return this.props.managementEndDate; }
    get currentVersionId(): string | null { return this.props.currentVersionId; }
    get versions(): HouseVersion[] { return [...this._versions]; }
    get ownerships(): OwnershipRecord[] { return [...this._ownerships]; }

    get currentVersion(): HouseVersion | undefined {
        return this._versions.find((v) => v.isLatest);
    }

    updateStatus(status: HouseStatus): void {
        this.props.status = status;
        if (status === 'SOLD_NOT_ACTIVE') {
            this.props.managementEndDate = new Date();
        }
    }

    addVersion(versionId: string, versionProps: Omit<HouseVersionProps, 'houseId' | 'isLatest' | 'effectiveTo'>): HouseVersion {
        const now = versionProps.effectiveFrom;
        const currentLatest = this.currentVersion;
        if (currentLatest) {
            currentLatest.markSuperseded(now);
        }
        const newVersion = HouseVersion.create(versionId, {
            ...versionProps,
            houseId: this.id,
            isLatest: true,
            effectiveTo: null,
        });
        this._versions.push(newVersion);
        this.props.currentVersionId = versionId;
        return newVersion;
    }

    assignOwner(ownershipId: string, ownerId: string): void {
        const existing = this._ownerships.find((o) => o.ownerId === ownerId);
        if (existing) return; // Already assigned
        this._ownerships.push({ id: ownershipId, houseId: this.id, ownerId });
    }

    removeOwner(ownerId: string): void {
        this._ownerships = this._ownerships.filter((o) => o.ownerId !== ownerId);
    }

    static create(id: string, props: HouseProps, initialVersion?: { versionId: string; versionProps: Omit<HouseVersionProps, 'houseId' | 'isLatest' | 'effectiveTo'> }): House {
        const house = new House(id, props);
        if (initialVersion) {
            house.addVersion(initialVersion.versionId, initialVersion.versionProps);
        }
        return house;
    }

    static reconstitute(id: string, props: HouseProps, versions: HouseVersion[], ownerships: OwnershipRecord[]): House {
        return new House(id, props, versions, ownerships);
    }
}
