import { useCallback, useMemo, useState } from "react";
import type { PlaygroundConfig } from "@/lib/playground-config";
import { generateCodeSnippet } from "@/utils/codeGenerator";

export type CopyStatus = "idle" | "copied" | "error";

export const useCodeGenerator = (config: PlaygroundConfig) => {
  const code = useMemo(() => generateCodeSnippet(config), [config]);
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }, [code]);

  return {
    code,
    copyStatus: status,
    copy,
  };
};
