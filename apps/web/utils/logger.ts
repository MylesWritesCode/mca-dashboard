/* eslint-disable no-console */
type LoggerScope = "info" | "debug" | "error" | "warn" | "log";

const prefix = (scope: LoggerScope) => `[${scope}]:`;

function logger(scope: LoggerScope = "log") {
  return (...message: any[]) => console[scope](prefix(scope), ...message);
}

export const info = logger("info");
export const debug = logger("debug");
export const error = logger("error");
export const warn = logger("warn");
export const log = logger();