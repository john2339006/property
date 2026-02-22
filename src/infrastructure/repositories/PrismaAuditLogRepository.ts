import { IAuditLogRepository, AuditLog } from '@/domain/audit';
import { PrismaClient } from '@prisma/client';

export class PrismaAuditLogRepository implements IAuditLogRepository {
    constructor(private readonly prisma: PrismaClient) { }

    private mapToDomain(model: any): AuditLog {
        return AuditLog.reconstitute(model.id, {
            userId: model.user_id,
            action: model.action,
            entityType: model.entity_type,
            entityId: model.entity_id,
            details: model.details,
            createdAt: model.created_at
        });
    }

    async save(log: AuditLog): Promise<void> {
        await this.prisma.auditLog.create({
            data: {
                id: log.id,
                user_id: log.userId,
                action: log.action,
                entity_type: log.entityType,
                entity_id: log.entityId,
                details: log.details,
                created_at: log.createdAt
            }
        });
    }

    async getRecentLogs(limit: number): Promise<AuditLog[]> {
        const models = await this.prisma.auditLog.findMany({
            orderBy: { created_at: 'desc' },
            take: limit
        });
        return models.map(m => this.mapToDomain(m));
    }
}
