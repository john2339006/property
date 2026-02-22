import { Entity } from '@/domain/shared/Entity';

export interface HouseVersionProps {
    houseId: string;
    buildingNo: string;
    unitNo: string;
    levelNo: string;
    doorNo: string;
    areaSqm: number;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    isLatest: boolean;
}

export class HouseVersion extends Entity<string> {
    private props: HouseVersionProps;

    private constructor(id: string, props: HouseVersionProps) {
        super(id);
        this.props = props;
    }

    get houseId(): string { return this.props.houseId; }
    get buildingNo(): string { return this.props.buildingNo; }
    get unitNo(): string { return this.props.unitNo; }
    get levelNo(): string { return this.props.levelNo; }
    get doorNo(): string { return this.props.doorNo; }
    get areaSqm(): number { return this.props.areaSqm; }
    get effectiveFrom(): Date { return this.props.effectiveFrom; }
    get effectiveTo(): Date | null { return this.props.effectiveTo; }
    get isLatest(): boolean { return this.props.isLatest; }

    get identifier(): string {
        return `${this.buildingNo}-${this.unitNo}-${this.doorNo}`;
    }

    markSuperseded(effectiveTo: Date): void {
        this.props.isLatest = false;
        this.props.effectiveTo = effectiveTo;
    }

    static create(id: string, props: HouseVersionProps): HouseVersion {
        return new HouseVersion(id, props);
    }

    static reconstitute(id: string, props: HouseVersionProps): HouseVersion {
        return new HouseVersion(id, props);
    }
}
