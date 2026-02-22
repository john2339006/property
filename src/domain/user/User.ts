import { Entity } from '@/domain/shared/Entity';

export type UserRole = 'PLATFORM_ADMIN' | 'COMPANY_ADMIN' | 'FINANCE' | 'OPERATOR' | 'READ_ONLY';

export interface UserProps {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    companyId: string;
}

export class User extends Entity<string> {
    private props: UserProps;

    private constructor(id: string, props: UserProps) {
        super(id);
        this.props = props;
    }

    get username(): string { return this.props.username; }
    get email(): string { return this.props.email; }
    get password(): string { return this.props.password; }
    get role(): UserRole { return this.props.role; }
    get companyId(): string { return this.props.companyId; }

    updateRole(role: UserRole): void {
        this.props.role = role;
    }

    updateEmail(email: string): void {
        this.props.email = email;
    }

    static create(id: string, props: UserProps): User {
        return new User(id, props);
    }

    static reconstitute(id: string, props: UserProps): User {
        return new User(id, props);
    }
}
