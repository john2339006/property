import { IAuditLogRepository, AuditLog } from '@/domain/audit';
import { Result } from '@/domain/shared/Result';

export interface LogActionRequest {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
}

export class LogActionUseCase {
    constructor(private readonly auditLogRepository: IAuditLogRepository) { }

    async execute(request: LogActionRequest): Promise<Result<void>> {
        const logResult = AuditLog.create({
            userId: request.userId,
            action: request.action,
            entityType: request.entityType,
            entityId: request.entityId,
            details: request.details
        });

        if (!logResult.isSuccess) {
            return Result.fail(logResult.getError());
        }

        await this.auditLogRepository.save(logResult.getValue());
        return Result.ok(undefined as void);
    }
}
