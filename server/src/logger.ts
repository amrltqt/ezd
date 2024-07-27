
import * as winston from "winston";

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "info";
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);

const filterProperties = (info, propertiesToExclude) => {
  const filteredInfo = { ...info };
  propertiesToExclude.forEach((prop) => {
    delete filteredInfo[prop];
  });
  return filteredInfo;
};

const FILTERED_PROPERTIES = ["label", "timestamp", "level", "message", "error"];

// Define the log format for development
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf((info) => {
    const filteredInfo = filterProperties(info, FILTERED_PROPERTIES);

    let message = `${info.timestamp} ${info.level} ${
      info.label ? info.label : "Add a label here"
    }: ${info.message}`;
    if (Object.keys(filteredInfo).length) {
      message += `\n${JSON.stringify(filteredInfo, null, 2)}`;
    }
    if (info.error) {
      message += `\n${info.error.stack}`;
    }
    return message;
  })
);

// Define the log format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),

  winston.format.printf((info) => {
    const filteredInfo = filterProperties(info, FILTERED_PROPERTIES);
    const baseInfo = {
      ...filteredInfo,
      label: info.label,
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
    };
    if (info.error) {
      baseInfo.stack = info.error.stack;
    }
    return JSON.stringify(baseInfo);
  })
);

// Choose the appropriate format based on the environment
const logFormat =
  process.env.NODE_ENV === "development" ? devFormat : prodFormat;

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
];

// Create the logger instance that has to be exported
// and used to log messages.
export const logger = winston.createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports,
});
