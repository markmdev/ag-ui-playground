"use client";

import { PlaygroundConfig } from "@/types/playground";

interface SettingsPanelProps {
  config: PlaygroundConfig;
  onUpdateAgentConfig: (key: keyof PlaygroundConfig["agentConfig"], value: string) => void;
  onUpdateLabel: (key: keyof PlaygroundConfig["labels"], value: string) => void;
  onUpdateColor: (key: keyof PlaygroundConfig["colors"], value: string) => void;
  onUpdateTypography: (key: keyof PlaygroundConfig["typography"], value: string) => void;
  onUpdateStyle: (key: keyof PlaygroundConfig["style"], value: string) => void;
  onReset: () => void;
}

export function SettingsPanel({
  config,
  onUpdateAgentConfig,
  onUpdateLabel,
  onUpdateColor,
  onUpdateTypography,
  onUpdateStyle,
  onReset,
}: SettingsPanelProps) {
  return (
    <div className="w-80 h-screen overflow-y-auto border-r border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        <button
          onClick={onReset}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Reset
        </button>
      </div>

      {/* Agent Configuration Section */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Agent Configuration</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              AG-UI URL
            </label>
            <input
              type="text"
              value={config.agentConfig.agUiUrl}
              onChange={(e) => onUpdateAgentConfig("agUiUrl", e.target.value)}
              placeholder="http://localhost:8123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Agent Name
            </label>
            <input
              type="text"
              value={config.agentConfig.agentName}
              onChange={(e) => onUpdateAgentConfig("agentName", e.target.value)}
              placeholder="sample_agent"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Text Customization Section */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Text</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={config.labels.title}
              onChange={(e) => onUpdateLabel("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Initial Message
            </label>
            <textarea
              value={config.labels.initial}
              onChange={(e) => onUpdateLabel("initial", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={config.labels.placeholder}
              onChange={(e) => onUpdateLabel("placeholder", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Color Scheme Section */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Colors</h3>

        <div className="space-y-4">
          <ColorInput
            label="Primary"
            value={config.colors.primary}
            onChange={(value) => onUpdateColor("primary", value)}
          />
          <ColorInput
            label="Contrast"
            value={config.colors.contrast}
            onChange={(value) => onUpdateColor("contrast", value)}
          />
          <ColorInput
            label="Background"
            value={config.colors.background}
            onChange={(value) => onUpdateColor("background", value)}
          />
          <ColorInput
            label="Secondary"
            value={config.colors.secondary}
            onChange={(value) => onUpdateColor("secondary", value)}
          />
          <ColorInput
            label="Secondary Contrast"
            value={config.colors.secondaryContrast}
            onChange={(value) => onUpdateColor("secondaryContrast", value)}
          />
          <ColorInput
            label="Separator"
            value={config.colors.separator}
            onChange={(value) => onUpdateColor("separator", value)}
          />
          <ColorInput
            label="Muted"
            value={config.colors.muted}
            onChange={(value) => onUpdateColor("muted", value)}
          />
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Typography</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Font Family
            </label>
            <select
              value={config.typography.fontFamily}
              onChange={(e) => onUpdateTypography("fontFamily", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="system-ui, -apple-system, sans-serif">System UI</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Font Size
            </label>
            <select
              value={config.typography.fontSize}
              onChange={(e) => onUpdateTypography("fontSize", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>
          </div>
        </div>
      </section>

      {/* Style Section */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Style</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Border Radius
            </label>
            <select
              value={config.style.borderRadius}
              onChange={(e) => onUpdateStyle("borderRadius", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0px">None (0px)</option>
              <option value="4px">Small (4px)</option>
              <option value="8px">Medium (8px)</option>
              <option value="12px">Large (12px)</option>
              <option value="16px">Extra Large (16px)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Padding
            </label>
            <select
              value={config.style.padding}
              onChange={(e) => onUpdateStyle("padding", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="8px">Small (8px)</option>
              <option value="12px">Medium (12px)</option>
              <option value="16px">Large (16px)</option>
              <option value="20px">Extra Large (20px)</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for color inputs
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
