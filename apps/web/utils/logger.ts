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
      }
    : undefined;

export const logger = pino({
  ...TEST_OPTIONS,
  ...DEV_OPTIONS,
  redact: [],
});
