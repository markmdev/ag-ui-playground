"use client";

import { useState } from "react";
import { PlaygroundConfig } from "@/types/playground";
import { generateExportFiles } from "@/utils/codeGenerator";

interface CodeExporterProps {
  config: PlaygroundConfig;
  isOpen: boolean;
  onClose: () => void;
}

type FileTab = "component" | "apiRoute" | "envVars";

export function CodeExporter({ config, isOpen, onClose }: CodeExporterProps) {
  const [activeTab, setActiveTab] = useState<FileTab>("component");
  const [copied, setCopied] = useState(false);

  const files = generateExportFiles(config);

  const getCurrentCode = () => {
    switch (activeTab) {
      case "component":
        return files.component;
      case "apiRoute":
        return files.apiRoute;
      case "envVars":
        return files.envVars;
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Export Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm">Setup Instructions:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Create <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">MyChat.tsx</code> and paste the component code</li>
            <li>2. <span className="font-semibold text-red-700">⚠️ Replace</span> <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">app/api/copilotkit/route.ts</code> with the API route code</li>
            <li>3. Add environment variables to <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">.env.local</code></li>
          </ol>
        </div>

        {/* File Tabs */}
        <div className="px-6 pt-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("component")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === "component"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              MyChat.tsx
            </button>
            <button
              onClick={() => setActiveTab("apiRoute")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === "apiRoute"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              route.ts
            </button>
            <button
              onClick={() => setActiveTab("envVars")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === "envVars"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              .env.local
            </button>
          </div>
        </div>

        {/* Code Display */}
        <div className="flex-1 overflow-auto p-6">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{getCurrentCode()}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
