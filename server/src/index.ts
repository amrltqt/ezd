import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { LocalTaskProcessor } from "./queue";
import { logger } from "./logger";
import { ImageGenerator } from "./engine/render";
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

const PLAYGROUND_BOARD_URL = process.env.PLAYGROUND_BOARD_URL || null;

app.get("/", (req, res) => {
  if (!PLAYGROUND_BOARD_URL) {
    // return 404
    res.status(404).send("Not found - build the PLAYGROUND board first");
    return;
  }
  // send html file generated in PLAYGROUND mode
  res.sendFile(PLAYGROUND_BOARD_URL);
});

app.get("/status", (req, res) => {
  res.send(JSON.stringify({ status: "ok" }));
});

app.post("/render", async (req, res) => {
  const { widgets, data, targets, size } = req.body;

  if (!widgets || !data || !targets || !size) {
    res.status(400).send("Missing required fields");
    return;
  }

  if (!Array.isArray(targets)) {
    res.status(400).send("Targets should be an array");
    return;
  }

  if (typeof size !== "number") {
    res.status(400).send("Size should be a number");
    return;
  }

  const task = processor.add(widgets, data, targets, size);
  processor.process();

  res.send(JSON.stringify({ id: task.id }));
});

app.listen(PORT, () => {
  logger.info(`Server started`, {
    label: "server.start",
    port: PORT,
  });
});
