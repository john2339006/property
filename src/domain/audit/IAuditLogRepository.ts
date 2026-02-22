import { AuditLog } from './AuditLog';

export interface IAuditLogRepository {
    save(log: AuditLog): Promise<void>;
    getRecentLogs(limit: number): Promise<AuditLog[]>;
}
