import { Entity } from '../shared/Entity';
import { UniqueId } from '../shared/UniqueId';
import { Result } from '../shared/Result';

interface InvoiceLineItemProps {
    invoiceId: string;
    houseIdentifier: string; // e.g., 'Building A - Unit 101'
    ownerName: string; // Snapshotted name at the time of invoicing
    amount: number;
}

export class InvoiceLineItem extends Entity<string> {
    private props: InvoiceLineItemProps;

    private constructor(id: string, props: InvoiceLineItemProps) {
        super(id);
        this.props = props;
    }

    get invoiceId(): string {
        return this.props.invoiceId;
    }

    get houseIdentifier(): string {
        return this.props.houseIdentifier;
    }

    get ownerName(): string {
        return this.props.ownerName;
    }

    get amount(): number {
        return this.props.amount;
    }

    public static create(props: InvoiceLineItemProps, id?: string): Result<InvoiceLineItem> {
        return Result.ok(new InvoiceLineItem(id ? id : UniqueId.create().value, props));
    }

    public static reconstitute(id: string, props: InvoiceLineItemProps): InvoiceLineItem {
        return new InvoiceLineItem(id, props);
    }
}
