import { AggregateRoot } from '@/domain/shared/AggregateRoot';
import { BillVersion, BillVersionProps } from './BillVersion';

export interface BillProps {
    houseId: string;
    billingPeriod: string;
    currentVersionId: string | null;
}

export class Bill extends AggregateRoot<string> {
    private props: BillProps;
    private _versions: BillVersion[];

    private constructor(id: string, props: BillProps, versions: BillVersion[] = []) {
        super(id);
        this.props = props;
        this._versions = versions;
    }

    get houseId(): string { return this.props.houseId; }
    get billingPeriod(): string { return this.props.billingPeriod; }
    get currentVersionId(): string | null { return this.props.currentVersionId; }
    get versions(): BillVersion[] { return [...this._versions]; }

    get currentVersion(): BillVersion | undefined {
        return this._versions.find((v) => v.isLatest);
    }

    addVersion(versionId: string, versionProps: Omit<BillVersionProps, 'billId' | 'isLatest'>): BillVersion {
        const currentLatest = this.currentVersion;
        if (currentLatest) {
            currentLatest.markSuperseded();
        }

        const newVersion = BillVersion.create(versionId, {
            ...versionProps,
            billId: this.id,
            isLatest: true,
        });

        this._versions.push(newVersion);
        this.props.currentVersionId = versionId;
        return newVersion;
    }

    overrideBill(versionId: string, newAmount: number, reason: string, createdBy: string): BillVersion {
        const latest = this.currentVersion;
        if (!latest) {
            throw new Error('Cannot override a bill with no versions');
        }

        return this.addVersion(versionId, {
            calculatedAmount: latest.calculatedAmount,
            discountApplied: latest.discountApplied,
            overriddenAmount: newAmount,
            reason: reason,
            createdBy: createdBy,
            createdAt: new Date()
        });
    }

    static create(id: string, props: BillProps, initialVersion?: { versionId: string; versionProps: Omit<BillVersionProps, 'billId' | 'isLatest'> }): Bill {
        const bill = new Bill(id, props);
        if (initialVersion) {
            bill.addVersion(initialVersion.versionId, initialVersion.versionProps);
        }
        return bill;
    }

    static reconstitute(id: string, props: BillProps, versions: BillVersion[]): Bill {
        return new Bill(id, props, versions);
    }
}
