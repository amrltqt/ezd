import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { LocalTaskProcessor } from "./queue";
import { logger } from "./logger";
import { ImageGenerator } from "./engine/screenshot";
import { MultiTargetDistributionEngine } from "./engine/distribution";
import { SlackUserDistributionUnit } from "./distribution/slack/user";
import { SlackChannelDistributionUnit } from "./distribution/slack/channel";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8611;

const processor = new LocalTaskProcessor(
  ImageGenerator,
  new MultiTargetDistributionEngine([
    new SlackUserDistributionUnit(),
    new SlackChannelDistributionUnit(),
  ])
);

app.post("/screenshot", async (req, res) => {
  const { widgets, data, targets } = req.body;

  const task = processor.add(widgets, data, targets);
  processor.process();

  res.send(JSON.stringify({ id: task.id }));
});

app.listen(PORT, () => {
  logger.info(`Server started`, {
    label: "server.start",
    port: PORT,
  });
});
