import { Entity } from '@/domain/shared/Entity';

export interface DiscountProps {
    companyId: string;
    houseId: string;
    percentage: number;
    oneTime: boolean;
    createdAt: Date;
}

export class Discount extends Entity<string> {
    private props: DiscountProps;

    private constructor(id: string, props: DiscountProps) {
        super(id);
        this.props = props;
    }

    get companyId(): string { return this.props.companyId; }
    get houseId(): string { return this.props.houseId; }
    get percentage(): number { return this.props.percentage; }
    get oneTime(): boolean { return this.props.oneTime; }
    get createdAt(): Date { return this.props.createdAt; }

    static create(id: string, props: DiscountProps): Discount {
        if (props.percentage <= 0 || props.percentage > 100) {
            throw new Error('Discount percentage must be between 0 and 100');
        }
        return new Discount(id, props);
    }

    static reconstitute(id: string, props: DiscountProps): Discount {
        return new Discount(id, props);
    }
}
