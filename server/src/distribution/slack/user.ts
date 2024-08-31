import { WebClient } from "@slack/web-api";
import {
  DistributionEnum,
  DistributionTarget,
  DistributionUnit,
} from "../../definitions";

const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;

export type SlackUserTarget = DistributionTarget & {
  id: string;
  filename: string;
  comment: string;
};

function isSlackUserTarget(obj: DistributionTarget): obj is SlackUserTarget {
  return (
    obj.type === DistributionEnum.SlackUser &&
    "id" in obj &&
    "comment" in obj &&
    "filename" in obj
  );
}

export class SlackUserDistributionUnit implements DistributionUnit {
  private client: WebClient;

  constructor() {
    this.client = new WebClient(SLACK_ACCESS_TOKEN);
  }

  async distribute(
    filePath: string,
    target: DistributionTarget
  ): Promise<void> {
    const slackChannelTarget = target as SlackUserTarget;

    try {
      const response = await this.client.files.uploadV2({
        channels: slackChannelTarget.id,
        file: filePath,
        initial_comment: slackChannelTarget.comment,
        filename: slackChannelTarget.filename,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file to Slack: ${response.error}`);
      }
    } catch (error) {
      throw new Error(`Failed to upload file to Slack: ${error}`);
    }

    return;
  }

  shouldHandle(target: DistributionTarget): boolean {
    return isSlackUserTarget(target);
  }
}
