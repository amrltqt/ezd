import {
  DistributionEngine,
  DistributionTarget,
  DistributionUnit,
} from "../definitions";
import { logger } from "../logger";

export class MultiTargetDistributionEngine implements DistributionEngine {
  private distributionUnits: DistributionUnit[];

  constructor(distributionUnits: DistributionUnit[]) {
    this.distributionUnits = distributionUnits;
  }

  async distribute(
    filePath: string,
    target: DistributionTarget
  ): Promise<void> {
    for (let i = 0; i < this.distributionUnits.length; i++) {
      if (this.distributionUnits[i].shouldHandle(target)) {
        try {
          await this.distributionUnits[i].distribute(filePath, target);
        } catch (error) {
          logger.error(`Failed to distribute to target`, {
            target,
            label: "distribution.failed",
            error: error,
          });
        }
        return;
      }
    }
  }
}
