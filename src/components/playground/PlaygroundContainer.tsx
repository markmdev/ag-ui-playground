"use client";

import { useState } from "react";
import { usePlaygroundConfig } from "@/hooks/usePlaygroundConfig";
import { SettingsPanel } from "./SettingsPanel";
import { PreviewPanel } from "./PreviewPanel";
import { CodeExporter } from "./CodeExporter";

export function PlaygroundContainer() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const {
    config,
    updateLabel,
    updateColor,
    updateTypography,
    updateStyle,
    resetConfig,
  } = usePlaygroundConfig();

  return (
    <>
      <div className="flex h-screen">
        <SettingsPanel
          config={config}
          onUpdateLabel={updateLabel}
          onUpdateColor={updateColor}
          onUpdateTypography={updateTypography}
          onUpdateStyle={updateStyle}
          onReset={resetConfig}
        />
        <PreviewPanel config={config} onExport={() => setIsExportOpen(true)} />
      </div>

      <CodeExporter
        config={config}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </>
  );
}
