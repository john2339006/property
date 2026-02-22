import { AggregateRoot } from '@/domain/shared/AggregateRoot';
import { OwnerVersion, OwnerVersionProps } from './OwnerVersion';

export type EntityType = 'INDIVIDUAL' | 'ORGANIZATION';

export interface OwnerProps {
    companyId: string;
    entityType: EntityType;
    currentVersionId: string | null;
}

export class Owner extends AggregateRoot<string> {
    private props: OwnerProps;
    private _versions: OwnerVersion[];

    private constructor(id: string, props: OwnerProps, versions: OwnerVersion[] = []) {
        super(id);
        this.props = props;
        this._versions = versions;
    }

    get companyId(): string { return this.props.companyId; }
    get entityType(): EntityType { return this.props.entityType; }
    get currentVersionId(): string | null { return this.props.currentVersionId; }
    get versions(): OwnerVersion[] { return [...this._versions]; }

    get currentVersion(): OwnerVersion | undefined {
        return this._versions.find((v) => v.isLatest);
    }

    /**
     * Add a new version, superseding the current latest version.
     * This is the core versioning pattern: updates create new immutable versions.
     */
    addVersion(versionId: string, versionProps: Omit<OwnerVersionProps, 'ownerId' | 'isLatest' | 'effectiveTo'>): OwnerVersion {
        const now = versionProps.effectiveFrom;

        // Mark current latest as superseded
        const currentLatest = this.currentVersion;
        if (currentLatest) {
            currentLatest.markSuperseded(now);
        }

        // Create new version as latest
        const newVersion = OwnerVersion.create(versionId, {
            ...versionProps,
            ownerId: this.id,
            isLatest: true,
            effectiveTo: null,
        });

        this._versions.push(newVersion);
        this.props.currentVersionId = versionId;
        return newVersion;
    }

    static create(id: string, props: OwnerProps, initialVersion?: { versionId: string; versionProps: Omit<OwnerVersionProps, 'ownerId' | 'isLatest' | 'effectiveTo'> }): Owner {
        const owner = new Owner(id, props);
        if (initialVersion) {
            owner.addVersion(initialVersion.versionId, initialVersion.versionProps);
        }
        return owner;
    }

    static reconstitute(id: string, props: OwnerProps, versions: OwnerVersion[]): Owner {
        return new Owner(id, props, versions);
    }
}
