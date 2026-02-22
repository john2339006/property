import { DomainError } from './DomainError';

export class Result<T, E extends DomainError = DomainError> {
    private readonly _isSuccess: boolean;
    private readonly _value?: T;
    private readonly _error?: E;

    private constructor(isSuccess: boolean, value?: T, error?: E) {
        this._isSuccess = isSuccess;
        this._value = value;
        this._error = error;
    }

    get isSuccess(): boolean {
        return this._isSuccess;
    }

    get isFailure(): boolean {
        return !this._isSuccess;
    }

    getValue(): T {
        if (!this._isSuccess) {
            throw new Error('Cannot get value from a failed result. Use getError() instead.');
        }
        return this._value as T;
    }

    getError(): E {
        if (this._isSuccess) {
            throw new Error('Cannot get error from a successful result. Use getValue() instead.');
        }
        return this._error as E;
    }

    static ok<T>(value: T): Result<T, never> {
        return new Result<T, never>(true, value);
    }

    static fail<E extends DomainError>(error: E): Result<never, E> {
        return new Result<never, E>(false, undefined, error);
    }
}
