import { describe, it, expect } from 'vitest';
import { Entity } from '../Entity';

class TestEntity extends Entity<string> {
    constructor(id: string) {
        super(id);
    }
}

describe('Entity', () => {
    it('should expose id', () => {
        const entity = new TestEntity('abc-123');
        expect(entity.id).toBe('abc-123');
    });

    it('should be equal when IDs match', () => {
        const e1 = new TestEntity('same-id');
        const e2 = new TestEntity('same-id');
        expect(e1.equals(e2)).toBe(true);
    });

    it('should not be equal when IDs differ', () => {
        const e1 = new TestEntity('id-1');
        const e2 = new TestEntity('id-2');
        expect(e1.equals(e2)).toBe(false);
    });

    it('should not be equal to null or undefined', () => {
        const e1 = new TestEntity('id-1');
        expect(e1.equals(null as unknown as TestEntity)).toBe(false);
        expect(e1.equals(undefined as unknown as TestEntity)).toBe(false);
    });
});
