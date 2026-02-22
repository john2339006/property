import { ValueObject } from './ValueObject';
import { DomainError } from './DomainError';
import { Result } from './Result';

interface MoneyProps {
    amount: number;
    currency: string;
}

export class Money extends ValueObject<MoneyProps> {
    private constructor(props: MoneyProps) {
        super(props);
    }

    get amount(): number {
        return this.props.amount;
    }

    get currency(): string {
        return this.props.currency;
    }

    static create(amount: number, currency: string): Result<Money> {
        if (currency.length !== 3) {
            return Result.fail(new DomainError('Currency must be a 3-letter ISO code', 'INVALID_CURRENCY'));
        }
        // Round to 2 decimal places to avoid floating point issues
        const rounded = Math.round(amount * 100) / 100;
        return Result.ok(new Money({ amount: rounded, currency: currency.toUpperCase() }));
    }

    add(other: Money): Result<Money> {
        if (this.currency !== other.currency) {
            return Result.fail(new DomainError('Cannot add money with different currencies', 'CURRENCY_MISMATCH'));
        }
        return Money.create(this.amount + other.amount, this.currency);
    }

    subtract(other: Money): Result<Money> {
        if (this.currency !== other.currency) {
            return Result.fail(new DomainError('Cannot subtract money with different currencies', 'CURRENCY_MISMATCH'));
        }
        return Money.create(this.amount - other.amount, this.currency);
    }

    multiply(factor: number): Result<Money> {
        return Money.create(this.amount * factor, this.currency);
    }
}
