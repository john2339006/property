import { AggregateRoot } from '../shared/AggregateRoot';
import { UniqueId } from '../shared/UniqueId';
import { Result } from '../shared/Result';
import { DomainError } from '../shared/DomainError';
import { InvoiceStatus } from './InvoiceStatus';
import { InvoiceLineItem } from './InvoiceLineItem';

interface InvoiceProps {
    billVersionId: string;
    houseId: string;
    billingPeriod: string;
    status: InvoiceStatus;
    createdAt: Date;
}

export class Invoice extends AggregateRoot<string> {
    private props: InvoiceProps;
    private _lineItems: InvoiceLineItem[];

    private constructor(id: string, props: InvoiceProps, lineItems: InvoiceLineItem[] = []) {
        super(id);
        this.props = props;
        this._lineItems = lineItems;
    }

    get billVersionId(): string {
        return this.props.billVersionId;
    }

    get houseId(): string {
        return this.props.houseId;
    }

    get billingPeriod(): string {
        return this.props.billingPeriod;
    }

    get status(): InvoiceStatus {
        return this.props.status;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get lineItems(): readonly InvoiceLineItem[] {
        return Object.freeze([...this._lineItems]);
    }

    get totalAmount(): number {
        return this._lineItems.reduce((sum, item) => sum + item.amount, 0);
    }

    public static create(props: Omit<InvoiceProps, 'status' | 'createdAt'> & { lineItemsData: Omit<Parameters<typeof InvoiceLineItem.create>[0], 'invoiceId'>[] }): Result<Invoice> {
        const id = UniqueId.create().value;
        const invoiceProps: InvoiceProps = {
            ...props,
            status: InvoiceStatus.DRAFT,
            createdAt: new Date(),
        };

        const invoice = new Invoice(id, invoiceProps);

        for (const itemData of props.lineItemsData) {
            const lineItemResult = InvoiceLineItem.create({
                ...itemData,
                invoiceId: id
            });

            if (!lineItemResult.isSuccess) {
                return Result.fail(lineItemResult.getError());
            }
            invoice._lineItems.push(lineItemResult.getValue());
        }

        return Result.ok(invoice);
    }

    public static reconstitute(id: string, props: InvoiceProps, lineItems: InvoiceLineItem[]): Invoice {
        return new Invoice(id, props, lineItems);
    }

    public issue(): Result<void> {
        if (this.props.status !== InvoiceStatus.DRAFT) {
            return Result.fail(new DomainError('Only DRAFT invoices can be issued', 'INVALID_STATE_TRANSITION'));
        }
        if (this._lineItems.length === 0) {
            return Result.fail(new DomainError('Cannot issue an invoice with no line items', 'INVALID_INVOICE_DATA'));
        }
        this.props.status = InvoiceStatus.ISSUED;
        return Result.ok(undefined as void);
    }

    public markPaid(): Result<void> {
        if (this.props.status !== InvoiceStatus.ISSUED) {
            return Result.fail(new DomainError('Only ISSUED invoices can be marked as paid', 'INVALID_STATE_TRANSITION'));
        }
        this.props.status = InvoiceStatus.PAID;
        return Result.ok(undefined as void);
    }

    public voidInvoice(): Result<void> {
        if (this.props.status === InvoiceStatus.PAID) {
            return Result.fail(new DomainError('Cannot void a PAID invoice', 'INVALID_STATE_TRANSITION'));
        }
        if (this.props.status === InvoiceStatus.VOIDED) {
            return Result.fail(new DomainError('Invoice is already voided', 'INVALID_STATE_TRANSITION'));
        }
        this.props.status = InvoiceStatus.VOIDED;
        return Result.ok(undefined as void);
    }
}
