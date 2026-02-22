import { describe, it, expect } from 'vitest';
import { Result } from '../Result';
import { DomainError } from '../DomainError';

describe('Result', () => {
    it('should create a successful result', () => {
        const result = Result.ok('hello');
        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);
        expect(result.getValue()).toBe('hello');
    });

    it('should create a failed result', () => {
        const error = new DomainError('something went wrong', 'TEST_ERROR');
        const result = Result.fail(error);
        expect(result.isSuccess).toBe(false);
        expect(result.isFailure).toBe(true);
        expect(result.getError()).toBe(error);
        expect(result.getError().code).toBe('TEST_ERROR');
    });

    it('should throw when getting value from failed result', () => {
        const result = Result.fail(new DomainError('fail'));
        expect(() => result.getValue()).toThrow();
    });

    it('should throw when getting error from successful result', () => {
        const result = Result.ok(42);
        expect(() => result.getError()).toThrow();
    });

    it('should work with complex types', () => {
        const data = { name: 'test', items: [1, 2, 3] };
        const result = Result.ok(data);
        expect(result.getValue()).toEqual(data);
    });
});
