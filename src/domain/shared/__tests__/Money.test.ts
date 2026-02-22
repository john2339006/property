import { describe, it, expect } from 'vitest';
import { Money } from '../Money';

describe('Money', () => {
    it('should create money with valid currency', () => {
        const result = Money.create(100, 'CNY');
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(100);
        expect(result.getValue().currency).toBe('CNY');
    });

    it('should fail with invalid currency code', () => {
        const result = Money.create(100, 'INVALID');
        expect(result.isFailure).toBe(true);
        expect(result.getError().code).toBe('INVALID_CURRENCY');
    });

    it('should add two money objects of same currency', () => {
        const m1 = Money.create(100.50, 'CNY').getValue();
        const m2 = Money.create(200.30, 'CNY').getValue();
        const result = m1.add(m2);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(300.80);
    });

    it('should fail to add different currencies', () => {
        const m1 = Money.create(100, 'CNY').getValue();
        const m2 = Money.create(200, 'USD').getValue();
        const result = m1.add(m2);
        expect(result.isFailure).toBe(true);
        expect(result.getError().code).toBe('CURRENCY_MISMATCH');
    });

    it('should subtract money of same currency', () => {
        const m1 = Money.create(300, 'CNY').getValue();
        const m2 = Money.create(100, 'CNY').getValue();
        const result = m1.subtract(m2);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(200);
    });

    it('should fail to subtract different currencies', () => {
        const m1 = Money.create(300, 'CNY').getValue();
        const m2 = Money.create(100, 'USD').getValue();
        const result = m1.subtract(m2);
        expect(result.isFailure).toBe(true);
        expect(result.getError().code).toBe('CURRENCY_MISMATCH');
    });

    it('should multiply money by a factor', () => {
        const money = Money.create(100, 'CNY').getValue();
        const result = money.multiply(1.5);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue().amount).toBe(150);
    });

    it('should round to 2 decimal places', () => {
        const result = Money.create(100.999, 'CNY');
        expect(result.getValue().amount).toBe(101);
    });

    it('should uppercase currency code', () => {
        const result = Money.create(100, 'cny');
        expect(result.getValue().currency).toBe('CNY');
    });

    it('should be equal when amount and currency are the same', () => {
        const m1 = Money.create(100, 'CNY').getValue();
        const m2 = Money.create(100, 'CNY').getValue();
        expect(m1.equals(m2)).toBe(true);
    });
});
