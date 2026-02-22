import { Entity } from '@/domain/shared/Entity';

export interface BillVersionProps {
    billId: string;
    calculatedAmount: number;
    discountApplied: number;
    overriddenAmount: number | null;
    createdBy: string;
    createdAt: Date;
    reason: string | null;
    isLatest: boolean;
}

export class BillVersion extends Entity<string> {
    private props: BillVersionProps;

    private constructor(id: string, props: BillVersionProps) {
        super(id);
        this.props = props;
    }

    get billId(): string { return this.props.billId; }
    get calculatedAmount(): number { return this.props.calculatedAmount; }
    get discountApplied(): number { return this.props.discountApplied; }
    get overriddenAmount(): number | null { return this.props.overriddenAmount; }
    get createdBy(): string { return this.props.createdBy; }
    get createdAt(): Date { return this.props.createdAt; }
    get reason(): string | null { return this.props.reason; }
    get isLatest(): boolean { return this.props.isLatest; }

    /**
     * The final amount to be paid for this bill version.
     */
    get finalAmount(): number {
        if (this.props.overriddenAmount !== null) {
            return this.props.overriddenAmount;
        }
        return Math.max(0, this.props.calculatedAmount - this.props.discountApplied);
    }

    markSuperseded(): void {
        this.props.isLatest = false;
    }

    static create(id: string, props: BillVersionProps): BillVersion {
        return new BillVersion(id, props);
    }

    static reconstitute(id: string, props: BillVersionProps): BillVersion {
        return new BillVersion(id, props);
    }
}
