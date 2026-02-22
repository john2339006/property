export interface ImportError {
    row: number;
    error: string;
}

export class ImportResult {
    public successCount: number;
    public failureCount: number;
    public errors: ImportError[];

    constructor() {
        this.successCount = 0;
        this.failureCount = 0;
        this.errors = [];
    }

    public addSuccess(): void {
        this.successCount++;
    }

    public addError(row: number, error: string): void {
        this.failureCount++;
        this.errors.push({ row, error });
    }
}
