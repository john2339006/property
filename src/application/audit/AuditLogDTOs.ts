export interface AuditLogDTO {
    id: string;
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
    createdAt: Date;
}
