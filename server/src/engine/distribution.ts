import { DistributionEngine, DistributionTarget, DistributionUnit } from "../definitions";

export class MultiTargetDistributionEngine implements DistributionEngine {
    
    private distributionUnits: DistributionUnit[];

    constructor(distributionUnits: DistributionUnit[]) {
        this.distributionUnits = distributionUnits;
    }

    async distribute(filePath: string, target: DistributionTarget): Promise<void> {
        for (let i = 0; i < this.distributionUnits.length; i++) {
            if (this.distributionUnits[i].shouldHandle(target)) {
                await this.distributionUnits[i].distribute(filePath, target);
                return;
            }
        }
    }

}