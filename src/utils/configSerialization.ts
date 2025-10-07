import type { PlaygroundConfig } from "@/lib/playground-config";

const encode = (value: string): string => {
  const base64 = (() => {
    if (typeof window === "undefined") {
      return Buffer.from(value, "utf-8").toString("base64");
    }

    return window.btoa(encodeURIComponent(value));
  })();

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const decode = (value: string): string => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

  if (typeof window === "undefined") {
    const padded =
      normalized + "===".slice((normalized.length + 3) % 4); // ensure valid padding
    return Buffer.from(padded, "base64").toString("utf-8");
  }

  const padded =
    normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);

  return decodeURIComponent(window.atob(padded));
};

export const serializeConfig = (config: PlaygroundConfig): string =>
  encode(JSON.stringify(config));

export const deserializeConfig = (
  encoded: string,
): PlaygroundConfig | undefined => {
  try {
    const json = decode(encoded);
    return JSON.parse(json) as PlaygroundConfig;
  } catch {
    return undefined;
  }
};
