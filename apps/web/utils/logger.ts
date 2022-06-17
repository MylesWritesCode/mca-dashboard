import pino from "pino";
import { ResponseOutput } from "@/lib/withErrorHandler";

const { NODE_ENV } = process.env;

const DEV_OPTIONS: (pino.LoggerOptions & Record<string, any>) | undefined =
  NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : undefined;

const TEST_OPTIONS: (pino.LoggerOptions & Record<string, any>) | undefined =
  NODE_ENV === "test"
    ? {
        enabled: true,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : undefined;

const logger = pino({
  ...TEST_OPTIONS,
  ...DEV_OPTIONS,
  redact: [],
});

export const log = {
  info: (log: ResponseOutput) => {
    logger.info(JSON.stringify(log));
  },
  error: (log: ResponseOutput) => {
    logger.error(JSON.stringify(log));
  },
};
