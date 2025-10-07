"use client";

import { useState } from "react";
import { PlaygroundConfig } from "@/types/playground";
import { generateCode, ExportFormat } from "@/utils/codeGenerator";

interface CodeExporterProps {
  config: PlaygroundConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function CodeExporter({ config, isOpen, onClose }: CodeExporterProps) {
  const [format, setFormat] = useState<ExportFormat>("hybrid");
  const [copied, setCopied] = useState(false);

  const code = generateCode(config, format);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
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

        {/* Format Tabs */}
        <div className="px-6 pt-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setFormat("hybrid")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                format === "hybrid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Hybrid (Recommended)
            </button>
            <button
              onClick={() => setFormat("props")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                format === "props"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Props Only
            </button>
            <button
              onClick={() => setFormat("css")}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                format === "css"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              CSS Only
            </button>
          </div>
        </div>

        {/* Code Display */}
        <div className="flex-1 overflow-auto p-6">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {format === "hybrid" && (
                <>
                  <li>1. Copy the React component code and CSS code separately</li>
                  <li>2. Create a new file (e.g., <code className="bg-blue-100 px-1 rounded">MyChat.tsx</code>) and paste the React code</li>
                  <li>3. Create a CSS file (e.g., <code className="bg-blue-100 px-1 rounded">custom-copilot.css</code>) and paste the CSS code</li>
                  <li>4. Import and use the component in your app</li>
                </>
              )}
              {format === "props" && (
                <>
                  <li>1. Copy the code above</li>
                  <li>2. Create a new component file and paste the code</li>
                  <li>3. Import and use it in your app</li>
                </>
              )}
              {format === "css" && (
                <>
                  <li>1. Copy the CSS code above</li>
                  <li>2. Add it to your global CSS file or create a separate CSS file</li>
                  <li>3. Import the CSS file in your app</li>
                </>
              )}
            </ul>
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
