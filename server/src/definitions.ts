export enum DistributionEnum {
    SlackUser = "slack-user",
    SlackChannel = "slack-channel"
}

export type ImagePath = string;

export type DistributionTarget = {
    type: DistributionEnum;
}

export interface Task {
    id: string;
    widgets: object;
    data: object;
    targets: DistributionTarget[];
}

export interface TaskProcessor {
    add: (widgets: object, data: object, targets: object[]) => Task;
    process: () => void;
}

export interface DashboardEngine {
    generate: (task: Task) => Promise<ImagePath>;
}

export interface DistributionEngine {
    distribute: (filePath: ImagePath, target: DistributionTarget) => Promise<void>;
}

export interface DistributionUnit {
    distribute: (filePath: ImagePath, target: DistributionTarget) => Promise<void>;
    shouldHandle: (target: DistributionTarget) => boolean;
}
