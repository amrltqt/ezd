import puppeteer from "puppeteer-core";

import { logger } from "../logger";
import { DashboardEngine, ImagePath, Task } from "../definitions";

const GOOGLE_CHROME_BIN = process.env.GOOGLE_CHROME_BIN;

declare global {
  interface Window {
    data: any;
    widgets: any;
    size: number;
  }
}

if (!GOOGLE_CHROME_BIN) {
  throw new Error("GOOGLE_CHROME_BIN is not defined");
}

const BOARD_URL = process.env.BOARD_URL || "http://localhost:5173";

if (!BOARD_URL) {
  throw new Error("BOARD_URL is not defined");
}

export async function generate(task: Task): Promise<ImagePath> {
  const screenshotPath = `/tmp/${task.id}.png`;
  const browser = await puppeteer.launch({
    executablePath: GOOGLE_CHROME_BIN,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  page.on("console", (msg) =>
    logger.info("Message catched by console", {
      label: "puppeteer.console",
      message: msg.text(),
    })
  );
  await page.evaluateOnNewDocument(
    ({ widgets, data, size }) => {
      window.data = data;
      window.widgets = widgets;
      window.size = size;
    },
    {
      widgets: task.widgets,
      data: task.data,
      size: task.size,
    }
  );

  await page.goto(BOARD_URL, {
    waitUntil: "networkidle0",
  });
  try {
    await page.waitForSelector("#canvas", { timeout: 2000 });

    let element = await page.$("#canvas");

    if (!element) {
      throw new Error("Unable to get the canvas element");
    }

    let bb = await element.boundingBox();

    if (!bb) {
      throw new Error("Unable to get the bounding box of the canvas");
    }
    await page.setViewport({
      width: Math.round(bb.width),
      height: Math.round(bb.height),
      deviceScaleFactor: 6,
    });

    element = await page.$("#canvas");

    if (!element) {
      throw new Error("Unable to get the canvas element");
    }

    bb = await element.boundingBox();

    if (!bb) {
      throw new Error("Unable to get the bounding box of the canvas");
    }

    await page.screenshot({
      path: screenshotPath,
      clip: bb,
    });
  } catch (e) {
    console.error(e);
  }
  await browser.close();

  return screenshotPath;
}

const ImageGenerator: DashboardEngine = {
  generate,
};

export { ImageGenerator };
