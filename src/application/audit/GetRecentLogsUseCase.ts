import { IAuditLogRepository } from '@/domain/audit';
import { AuditLogDTO } from './AuditLogDTOs';

export class GetRecentLogsUseCase {
    constructor(private readonly auditLogRepository: IAuditLogRepository) { }

    async execute(limit: number = 50): Promise<AuditLogDTO[]> {
        const logs = await this.auditLogRepository.getRecentLogs(limit);
        return logs.map(log => ({
            id: log.id,
            userId: log.userId,
            action: log.action,
            entityType: log.entityType,
            entityId: log.entityId,
            details: log.details,
            createdAt: log.createdAt
        }));
    }
}
