export class DomainError extends Error {
    public readonly code: string;

    constructor(message: string, code: string = 'DOMAIN_ERROR') {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}
