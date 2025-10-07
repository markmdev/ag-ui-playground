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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "PREVIEW_READY") {
        setIsReady(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (isReady && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "UPDATE_CONFIG",
          config,
        },
        "*"
      );
    }
  }, [config, isReady]);

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <button
          onClick={onExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export Code
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            src="/preview"
            className="w-full h-full border-0"
            title="CopilotChat Preview"
          />
        </div>
      </div>
    </div>
  );
}
