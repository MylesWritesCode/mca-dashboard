import { ResponseOutput } from "@/lib/withErrorHandler";
import pino from "pino";

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
        enabled: false,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        sync: true,
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
