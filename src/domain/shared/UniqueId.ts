import { ValueObject } from './ValueObject';

interface UniqueIdProps {
    value: string;
}

export class UniqueId extends ValueObject<UniqueIdProps> {
    private constructor(props: UniqueIdProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(id?: string): UniqueId {
        return new UniqueId({ value: id ?? crypto.randomUUID() });
    }

    toString(): string {
        return this.props.value;
    }
}
