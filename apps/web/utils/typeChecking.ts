// NOTE: this feels weird, but it makes sure this module is something we can spy on for tests
import * as ThisModule from "./typeChecking";

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && !ThisModule.isArray(value);
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};
