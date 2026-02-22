import { AggregateRoot } from '@/domain/shared/AggregateRoot';
import { Entity } from '@/domain/shared/Entity';

export type FeeModel = 'AREA' | 'TIERED';
export type UsageType = 'PERSONAL' | 'BUSINESS' | 'PUBLIC';

export interface BillingTypeVersionProps {
    billingTypeId: string;
    feeModel: FeeModel;
    pricePerSqm: number | null;
    usageType: UsageType;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    isLatest: boolean;
}

export class BillingTypeVersion extends Entity<string> {
    private props: BillingTypeVersionProps;

    private constructor(id: string, props: BillingTypeVersionProps) {
        super(id);
        this.props = props;
    }

    get billingTypeId(): string { return this.props.billingTypeId; }
    get feeModel(): FeeModel { return this.props.feeModel; }
    get pricePerSqm(): number | null { return this.props.pricePerSqm; }
    get usageType(): UsageType { return this.props.usageType; }
    get effectiveFrom(): Date { return this.props.effectiveFrom; }
    get effectiveTo(): Date | null { return this.props.effectiveTo; }
    get isLatest(): boolean { return this.props.isLatest; }

    markSuperseded(effectiveTo: Date): void {
        this.props.isLatest = false;
        this.props.effectiveTo = effectiveTo;
    }

    static create(id: string, props: BillingTypeVersionProps): BillingTypeVersion {
        return new BillingTypeVersion(id, props);
    }

    static reconstitute(id: string, props: BillingTypeVersionProps): BillingTypeVersion {
        return new BillingTypeVersion(id, props);
    }
}

export interface BillingTypeProps {
    companyId: string;
    name: string;
    currentVersionId: string | null;
}

export class BillingType extends AggregateRoot<string> {
    private props: BillingTypeProps;
    private _versions: BillingTypeVersion[];

    private constructor(id: string, props: BillingTypeProps, versions: BillingTypeVersion[] = []) {
        super(id);
        this.props = props;
        this._versions = versions;
    }

    get companyId(): string { return this.props.companyId; }
    get name(): string { return this.props.name; }
    get currentVersionId(): string | null { return this.props.currentVersionId; }
    get versions(): BillingTypeVersion[] { return [...this._versions]; }

    get currentVersion(): BillingTypeVersion | undefined {
        return this._versions.find((v) => v.isLatest);
    }

    updateName(name: string): void {
        this.props.name = name;
    }

    addVersion(versionId: string, versionProps: Omit<BillingTypeVersionProps, 'billingTypeId' | 'isLatest' | 'effectiveTo'>): BillingTypeVersion {
        const now = versionProps.effectiveFrom;
        const currentLatest = this.currentVersion;
        if (currentLatest) {
            currentLatest.markSuperseded(now);
        }
        const newVersion = BillingTypeVersion.create(versionId, {
            ...versionProps,
            billingTypeId: this.id,
            isLatest: true,
            effectiveTo: null,
        });
        this._versions.push(newVersion);
        this.props.currentVersionId = versionId;
        return newVersion;
    }

    static create(id: string, props: BillingTypeProps, initialVersion?: { versionId: string; versionProps: Omit<BillingTypeVersionProps, 'billingTypeId' | 'isLatest' | 'effectiveTo'> }): BillingType {
        const bt = new BillingType(id, props);
        if (initialVersion) {
            bt.addVersion(initialVersion.versionId, initialVersion.versionProps);
        }
        return bt;
    }

    static reconstitute(id: string, props: BillingTypeProps, versions: BillingTypeVersion[]): BillingType {
        return new BillingType(id, props, versions);
    }
}
