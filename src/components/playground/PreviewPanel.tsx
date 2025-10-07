"use client";

import { useEffect, useRef, useState } from "react";
import { PlaygroundConfig } from "@/types/playground";

interface PreviewPanelProps {
  config: PlaygroundConfig;
  onExport: () => void;
}

export function PreviewPanel({ config, onExport }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(600);
  const [debouncedAgentConfig, setDebouncedAgentConfig] = useState(config.agentConfig);

  // Debounce agent config changes to avoid iframe reload on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAgentConfig(config.agentConfig);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [config.agentConfig]);

  const iframeSrc = `/preview?agUiUrl=${encodeURIComponent(debouncedAgentConfig.agUiUrl)}&agentName=${encodeURIComponent(debouncedAgentConfig.agentName)}`;

  // Reset ready state when iframe src changes
  useEffect(() => {
    setIsReady(false);
  }, [iframeSrc]);

  useEffect(() => {
    const MIN_H = 600; // keep something visible
    const EPS = 2; // ignore tiny jitter

    const onMsg = (event: MessageEvent) => {
      if (event.data?.type === "PREVIEW_READY") setIsReady(true);
      if (event.data?.type === "IFRAME_HEIGHT") {
        const raw = Number(event.data.height) || 0;
        const next = Math.max(MIN_H, Math.ceil(raw));
        setIframeHeight((prev) => (Math.abs(prev - next) > EPS ? next : prev));
      }
    };

    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    if (isReady && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "UPDATE_CONFIG", config }, "*");
    }
  }, [config, isReady]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <button
          onClick={onExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export Code
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1">
          <iframe
            key={iframeSrc}
            ref={iframeRef}
            src={iframeSrc}
            title="CopilotChat Preview"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
