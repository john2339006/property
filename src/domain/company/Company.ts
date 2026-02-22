import { AggregateRoot } from '@/domain/shared/AggregateRoot';

export type BillingPeriodType = 'MONTHLY' | 'ANNUAL';

export interface CompanyProps {
    legalName: string;
    registrationLicenseId: string;
    contactInformation: string;
    billingInformation: string;
    defaultBillingPeriod: BillingPeriodType;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Company extends AggregateRoot<string> {
    private props: CompanyProps;

    private constructor(id: string, props: CompanyProps) {
        super(id);
        this.props = props;
    }

    get legalName(): string {
        return this.props.legalName;
    }

    get registrationLicenseId(): string {
        return this.props.registrationLicenseId;
    }

    get contactInformation(): string {
        return this.props.contactInformation;
    }

    get billingInformation(): string {
        return this.props.billingInformation;
    }

    get defaultBillingPeriod(): BillingPeriodType {
        return this.props.defaultBillingPeriod;
    }

    get currency(): string {
        return this.props.currency;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    updateProfile(updates: Partial<Pick<CompanyProps, 'legalName' | 'contactInformation' | 'billingInformation' | 'defaultBillingPeriod'>>): void {
        if (updates.legalName !== undefined) this.props.legalName = updates.legalName;
        if (updates.contactInformation !== undefined) this.props.contactInformation = updates.contactInformation;
        if (updates.billingInformation !== undefined) this.props.billingInformation = updates.billingInformation;
        if (updates.defaultBillingPeriod !== undefined) this.props.defaultBillingPeriod = updates.defaultBillingPeriod;
        this.props.updatedAt = new Date();
    }

    static create(id: string, props: CompanyProps): Company {
        return new Company(id, props);
    }

    static reconstitute(id: string, props: CompanyProps): Company {
        return new Company(id, props);
    }
}
