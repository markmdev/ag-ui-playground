"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SettingsPanel } from "./SettingsPanel";
import { PreviewPanel } from "./PreviewPanel";
import { CodeExporter } from "./CodeExporter";
import { usePlaygroundConfig } from "@/hooks/usePlaygroundConfig";
import { useCodeGenerator, type CopyStatus } from "@/hooks/useCodeGenerator";
import {
  deserializeConfig,
  serializeConfig,
} from "@/utils/configSerialization";

export const PlaygroundContainer = () => {
  const { config, actions, presets, starterPromptPresets, activePresetId, isDirty } =
    usePlaygroundConfig();
  const { code, copyStatus: codeCopyStatus, copy: copyCode } =
    useCodeGenerator(config);

  const [configCopyStatus, setConfigCopyStatus] =
    useState<CopyStatus>("idle");
  const [isExporterOpen, setExporterOpen] = useState(false);
  const hydratedFromUrl = useRef(false);

  useEffect(() => {
    if (hydratedFromUrl.current || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const encodedConfig = params.get("config");

    if (encodedConfig) {
      const parsed = deserializeConfig(encodedConfig);
      if (parsed) {
        actions.replaceConfig(parsed);
      }
    }

    hydratedFromUrl.current = true;
  }, [actions]);

  useEffect(() => {
    if (!hydratedFromUrl.current || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("config", serializeConfig(config));
    const query = params.toString();
    const nextUrl = `${window.location.pathname}?${query}`;
    window.history.replaceState(null, "", nextUrl);
  }, [config]);

  const handleCopyConfig = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setConfigCopyStatus("copied");
      setTimeout(() => setConfigCopyStatus("idle"), 1500);
    } catch {
      setConfigCopyStatus("error");
      setTimeout(() => setConfigCopyStatus("idle"), 2500);
    }
  }, [config]);

  return (
    <div className="flex min-h-screen max-w-full overflow-hidden bg-neutral-100">
      <SettingsPanel
        config={config}
        actions={actions}
        presets={presets}
        starterPromptPresets={starterPromptPresets}
        activePresetId={activePresetId}
        isDirty={isDirty}
        copyStatus={configCopyStatus}
        onCopyConfig={handleCopyConfig}
        onExportCode={() => setExporterOpen(true)}
      />
      <PreviewPanel config={config} />
      <CodeExporter
        open={isExporterOpen}
        code={code}
        copyStatus={codeCopyStatus}
        onCopy={copyCode}
        onClose={() => setExporterOpen(false)}
      />
    </div>
  );
};
