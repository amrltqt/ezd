import { randomUUID } from "crypto";
import { DashboardEngine, DistributionEngine, DistributionTarget, Task, TaskProcessor } from "./definitions";
import { logger } from "./logger";


export class LocalTaskProcessor implements TaskProcessor {

    private queue: Task[];
    private isProcessing: boolean;

    private generationStrategy: DashboardEngine;
    private distributionStrategy: DistributionEngine;

    constructor(
        generationStrategy: DashboardEngine, 
        distributionStrategy: DistributionEngine
    ) {
        this.queue = [];
        this.generationStrategy = generationStrategy;
        this.distributionStrategy = distributionStrategy;
    }

    add(widgets: object, data: object, targets: object[]): Task {
        const task: Task = {
            id: randomUUID(),
            widgets,
            data,
            targets: (targets as DistributionTarget[])
        };

        this.queue.push(task);

        logger.info(`Task ${task.id} added to the queue`, {label: 'queue.add.id', task_id: task.id});
        logger.info(`Queue length: ${this.queue.length}`, {label: 'queue.add.length', queue_length: this.queue.length});

        return task;
    }

    async process(): Promise<void> {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        while (this.queue.length > 0) {
            const nextTask = this.queue.shift();
            
            if (!nextTask) {
                break;
            }
            logger.info(`Processing task ${nextTask.id}`, {label: 'queue.process.task', task_id: nextTask.id} );
            const imagePath = await this.generationStrategy.generate(nextTask);            

            logger.info(`${nextTask.id} screenshot generated`, {label: 'queue.process.generated', task_id: nextTask.id});
            
            for (let i = 0; i < nextTask.targets.length; i++) {
                await this.distributionStrategy.distribute(
                    imagePath, 
                    nextTask.targets[i]
                );
            }
            logger.info(`${nextTask.id} screenshot distributed`, {label: 'queue.process.distributed', task_id: nextTask.id});
        }

        this.isProcessing = false;
    }
}