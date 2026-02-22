import { Entity } from '../shared/Entity';
import { UniqueId } from '../shared/UniqueId';
import { Result } from '../shared/Result';

export interface AuditLogProps {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
    createdAt: Date;
}

export class AuditLog extends Entity<string> {
    private props: AuditLogProps;

    private constructor(id: string, props: AuditLogProps) {
        super(id);
        this.props = props;
    }

    get userId(): string { return this.props.userId; }
    get action(): string { return this.props.action; }
    get entityType(): string { return this.props.entityType; }
    get entityId(): string { return this.props.entityId; }
    get details(): string { return this.props.details; }
    get createdAt(): Date { return this.props.createdAt; }

    public static create(props: Omit<AuditLogProps, 'createdAt'>, id?: string): Result<AuditLog> {
        const auditLogProps: AuditLogProps = {
            ...props,
            createdAt: new Date()
        };
        return Result.ok(new AuditLog(id ? id : UniqueId.create().value, auditLogProps));
    }

    public static reconstitute(id: string, props: AuditLogProps): AuditLog {
        return new AuditLog(id, props);
    }
}
