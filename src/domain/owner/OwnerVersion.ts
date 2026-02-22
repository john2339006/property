import { Entity } from '@/domain/shared/Entity';

export interface OwnerVersionProps {
    ownerId: string;
    fullLegalName: string;
    idNumber: string;
    taxId: string | null;
    invoicingName: string;
    phone: string;
    email: string;
    mailingAddress: string;
    preferredContactMethod: string;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    isLatest: boolean;
}

export class OwnerVersion extends Entity<string> {
    private props: OwnerVersionProps;

    private constructor(id: string, props: OwnerVersionProps) {
        super(id);
        this.props = props;
    }

    get ownerId(): string { return this.props.ownerId; }
    get fullLegalName(): string { return this.props.fullLegalName; }
    get idNumber(): string { return this.props.idNumber; }
    get taxId(): string | null { return this.props.taxId; }
    get invoicingName(): string { return this.props.invoicingName; }
    get phone(): string { return this.props.phone; }
    get email(): string { return this.props.email; }
    get mailingAddress(): string { return this.props.mailingAddress; }
    get preferredContactMethod(): string { return this.props.preferredContactMethod; }
    get effectiveFrom(): Date { return this.props.effectiveFrom; }
    get effectiveTo(): Date | null { return this.props.effectiveTo; }
    get isLatest(): boolean { return this.props.isLatest; }

    markSuperseded(effectiveTo: Date): void {
        this.props.isLatest = false;
        this.props.effectiveTo = effectiveTo;
    }

    static create(id: string, props: OwnerVersionProps): OwnerVersion {
        return new OwnerVersion(id, props);
    }

    static reconstitute(id: string, props: OwnerVersionProps): OwnerVersion {
        return new OwnerVersion(id, props);
    }
}
