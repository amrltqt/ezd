import { WebClient } from "@slack/web-api";
import {
  DistributionEnum,
  DistributionTarget,
  DistributionUnit,
} from "../../definitions";

const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;

export type SlackChannelTarget = DistributionTarget & {
  id: string;
  filename: string;
  comment: string;
};

function isSlackChannelTarget(
  obj: DistributionTarget
): obj is SlackChannelTarget {
  return (
    obj.type === DistributionEnum.SlackChannel &&
    "id" in obj &&
    "comment" in obj &&
    "filename" in obj
  );
}

export class SlackChannelDistributionUnit implements DistributionUnit {
  private client: WebClient;

  constructor() {
    this.client = new WebClient(SLACK_ACCESS_TOKEN);
  }

  async distribute(
    filePath: string,
    target: DistributionTarget
  ): Promise<void> {
    const slackChannelTarget = target as SlackChannelTarget;

    await this.client.files.uploadV2({
      channel_id: slackChannelTarget.id,
      file: filePath,
      initial_comment: slackChannelTarget.comment,
      filename: slackChannelTarget.filename,
    });

    return;
  }

  shouldHandle(target: DistributionTarget): boolean {
    return isSlackChannelTarget(target);
  }
}
