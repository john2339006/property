import { describe, it, expect } from 'vitest';
import { ValueObject } from '../ValueObject';

class TestVO extends ValueObject<{ value: string }> {
    constructor(value: string) {
        super({ value });
    }

    get value(): string {
        return this.props.value;
    }
}

class AnotherVO extends ValueObject<{ value: string }> {
    constructor(value: string) {
        super({ value });
    }
}

describe('ValueObject', () => {
    it('should be equal when props are the same', () => {
        const vo1 = new TestVO('hello');
        const vo2 = new TestVO('hello');
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should not be equal when props differ', () => {
        const vo1 = new TestVO('hello');
        const vo2 = new TestVO('world');
        expect(vo1.equals(vo2)).toBe(false);
    });

    it('should not be equal to a different class with same props', () => {
        const vo1 = new TestVO('hello');
        const vo2 = new AnotherVO('hello');
        expect(vo1.equals(vo2)).toBe(false);
    });

    it('should not be equal to null or undefined', () => {
        const vo1 = new TestVO('hello');
        expect(vo1.equals(null as unknown as TestVO)).toBe(false);
        expect(vo1.equals(undefined as unknown as TestVO)).toBe(false);
    });

    it('should have immutable props', () => {
        const vo = new TestVO('hello');
        expect(() => {
            (vo as unknown as { props: { value: string } }).props.value = 'changed';
        }).toThrow();
    });
});
