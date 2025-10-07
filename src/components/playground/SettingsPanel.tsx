"use client";

import { useMemo, useState, useEffect, type ReactNode } from "react";
import type {
  PlaygroundConfig,
  PlaygroundPreset,
  PlaygroundRadius,
  PlaygroundDensity,
  PlaygroundColorScheme,
  StarterPromptPreset,
} from "@/lib/playground-config";
import type { PlaygroundConfigActions } from "@/hooks/usePlaygroundConfig";

type CopyStatus = "idle" | "copied" | "error";

export interface SettingsPanelProps {
  config: PlaygroundConfig;
  actions: PlaygroundConfigActions;
  presets: PlaygroundPreset[];
  starterPromptPresets: StarterPromptPreset[];
  activePresetId?: string;
  isDirty: boolean;
  copyStatus: CopyStatus;
  onCopyConfig: () => Promise<void>;
  onExportCode: () => void;
}

export const SettingsPanel = ({
  config,
  actions,
  presets,
  starterPromptPresets,
  activePresetId,
  isDirty,
  copyStatus,
  onCopyConfig,
  onExportCode,
}: SettingsPanelProps) => {
  const starterPromptPresetId = useMemo(() => {
    const match = starterPromptPresets.find(
      (preset) =>
        JSON.stringify(preset.prompts) ===
        JSON.stringify(config.startScreen.starterPrompts),
    );
    return match?.id ?? "custom";
  }, [config.startScreen.starterPrompts, starterPromptPresets]);

  return (
    <aside className="w-full max-w-sm shrink-0 border-r border-neutral-200 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Playground
          </p>
          <p className="text-sm text-neutral-900">
            Configure your CopilotKit chat
          </p>
        </div>
        <button
          onClick={onExportCode}
          className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
        >
          <span aria-hidden>⟡</span>
          Export
        </button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto px-6 py-6 text-sm text-neutral-900">
        <PanelSection
          title="Preset"
          description="Start from a themed baseline."
        >
          <select
            value={activePresetId ?? "custom"}
            onChange={(event) => {
              if (event.target.value === "custom") {
                return;
              }
              actions.applyPreset(event.target.value);
            }}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
            <option value="custom">Custom</option>
          </select>

          <div className="flex gap-2 pt-3">
            <button
              onClick={onCopyConfig}
              className="w-1/2 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
            >
              {copyStatus === "copied"
                ? "Copied ✓"
                : copyStatus === "error"
                  ? "Copy failed"
                  : "Copy config"}
            </button>
            <button
              onClick={actions.resetConfig}
              disabled={!isDirty}
              className="w-1/2 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400"
            >
              Reset
            </button>
          </div>
        </PanelSection>

        <PanelSection
          title="Color scheme"
          description="Control the theme colors and accents."
        >
          <SegmentedControl
            value={config.colorScheme}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
            ]}
            onChange={(value) =>
              actions.updateRoot({
                colorScheme: value as PlaygroundColorScheme,
              })
            }
          />

          <ToggleField
            label="Custom surface colors"
            description="Override background surfaces with accent tint."
            value={config.customSurfaceColors}
            onChange={(value) => actions.updateRoot({ customSurfaceColors: value })}
          />

          <ToggleField
            label="Tint grayscale elements"
            description="Add accent tint to separators and muted elements."
            value={config.tintedGrayscale}
            onChange={(value) => actions.updateRoot({ tintedGrayscale: value })}
          />

          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Accent color
            </span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.accentColor}
                onChange={(event) =>
                  actions.updateRoot({ accentColor: event.target.value })
                }
                className="h-10 w-14 cursor-pointer rounded border border-neutral-200 bg-white"
                aria-label="Accent color"
              />
              <DebouncedTextInput
                value={config.accentColor}
                onChange={(value) => actions.updateRoot({ accentColor: value })}
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              />
            </div>
          </label>
        </PanelSection>

        <PanelSection
          title="Typography"
          description="Pick font families and base size."
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Font family
            </span>
            <select
              value={config.typography.fontFamily}
              onChange={(event) =>
                actions.updateTypography({ fontFamily: event.target.value })
              }
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
            >
              {FONT_FAMILIES.map((family) => (
                <option key={family}>{family}</option>
              ))}
            </select>
          </label>
          <LabelledInput
            label="Font size"
            input={
              <DebouncedTextInput
                value={config.typography.fontSize}
                onChange={(value) =>
                  actions.updateTypography({ fontSize: value })
                }
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              />
            }
          />
        </PanelSection>

        <PanelSection
          title="Style"
          description="Adjust radius and density."
        >
          <LabelledInput
            label="Radius"
            input={
              <select
                value={config.style.radius}
                onChange={(event) =>
                  actions.updateStyle({
                    radius: event.target.value as PlaygroundRadius,
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              >
                {RADIUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            }
          />

          <LabelledInput
            label="Density"
            input={
              <select
                value={config.style.density}
                onChange={(event) =>
                  actions.updateStyle({
                    density: event.target.value as PlaygroundDensity,
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              >
                {DENSITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            }
          />
        </PanelSection>

        <PanelSection
          title="Start screen"
          description="Customize the initial experience."
        >
          <LabelledInput
            label="Greeting"
            input={
              <DebouncedTextInput
                value={config.startScreen.greeting}
                onChange={(value) =>
                  actions.updateStartScreen({ greeting: value })
                }
                placeholder="What can I help with?"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              />
            }
          />
          <LabelledInput
            label="Starter prompts"
            input={
              <select
                value={starterPromptPresetId}
                onChange={(event) => {
                  const preset =
                    starterPromptPresets.find(
                      (item) => item.id === event.target.value,
                    ) ?? starterPromptPresets[0];
                  actions.updateStartScreen({
                    starterPrompts: preset.prompts,
                  });
                }}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              >
                {starterPromptPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
                <option value="custom">Custom</option>
              </select>
            }
          />
        </PanelSection>

        <PanelSection title="Composer" description="Fine tune the input box.">
          <LabelledInput
            label="Placeholder"
            input={
              <DebouncedTextInput
                value={config.composer.placeholder}
                onChange={(value) =>
                  actions.updateComposer({ placeholder: value })
                }
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              />
            }
          />

          <LabelledInput
            label="Disclaimer"
            input={
              <DebouncedTextInput
                value={config.composer.disclaimer}
                onChange={(value) =>
                  actions.updateComposer({ disclaimer: value })
                }
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
              />
            }
          />

          <ToggleField
            label="Attachments"
            description="Enable file attachment button in the composer."
            value={config.composer.attachments}
            onChange={(value) =>
              actions.updateComposer({ attachments: value })
            }
          />
        </PanelSection>

        <PanelSection
          title="Advanced"
          description="Toggle additional surface options."
        >
          <ToggleField
            label="Model picker"
            value={config.options.modelPicker}
            onChange={(value) =>
              actions.updateOptions((options) => ({
                ...options,
                modelPicker: value,
              }))
            }
          />
          <ToggleField
            label="Tool menu — Search docs"
            value={config.options.toolMenu.searchDocs}
            onChange={(value) =>
              actions.updateOptions((options) => ({
                ...options,
                toolMenu: { ...options.toolMenu, searchDocs: value },
              }))
            }
          />
          <ToggleField
            label="Tool menu — Create theme"
            value={config.options.toolMenu.createTheme}
            onChange={(value) =>
              actions.updateOptions((options) => ({
                ...options,
                toolMenu: { ...options.toolMenu, createTheme: value },
              }))
            }
          />
          <ToggleField
            label="Message action — Copy"
            value={config.options.messageActions.copy}
            onChange={(value) =>
              actions.updateOptions((options) => ({
                ...options,
                messageActions: {
                  ...options.messageActions,
                  copy: value,
                },
              }))
            }
          />
          <ToggleField
            label="Message action — Share"
            value={config.options.messageActions.share}
            onChange={(value) =>
              actions.updateOptions((options) => ({
                ...options,
                messageActions: {
                  ...options.messageActions,
                  share: value,
                },
              }))
            }
          />
        </PanelSection>
      </div>
    </aside>
  );
};

const FONT_FAMILIES = [
  "Open Sans",
  "Inter",
  "Sohne",
  "Neue Haas Grotesk",
  "JetBrains Mono",
  "IBM Plex Sans",
  "System UI",
];

const RADIUS_OPTIONS: Array<{ label: string; value: PlaygroundRadius }> = [
  { label: "None", value: "none" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Pill", value: "pill" },
];

const DENSITY_OPTIONS: Array<{ label: string; value: PlaygroundDensity }> = [
  { label: "Compact", value: "compact" },
  { label: "Normal", value: "normal" },
  { label: "Comfortable", value: "comfortable" },
];

interface PanelSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const PanelSection = ({ title, description, children }: PanelSectionProps) => (
  <section>
    <header className="mb-3">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {title}
      </p>
      {description ? (
        <p className="text-xs text-neutral-500">{description}</p>
      ) : null}
    </header>
    <div className="flex flex-col gap-3">{children}</div>
  </section>
);

interface ToggleFieldProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleField = ({
  label,
  description,
  value,
  onChange,
}: ToggleFieldProps) => (
  <div className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
    <div>
      <p className="text-sm font-medium text-neutral-900">{label}</p>
      {description ? (
        <p className="text-xs text-neutral-500">{description}</p>
      ) : null}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 rounded-full transition ${
        value ? "bg-neutral-900" : "bg-neutral-200"
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full bg-white shadow transition ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  </div>
);

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  value: string;
  options: SegmentedControlOption[];
  onChange: (value: string) => void;
}

const SegmentedControl = ({
  value,
  options,
  onChange,
}: SegmentedControlProps) => (
  <div className="grid grid-cols-2 gap-2 rounded-xl border border-neutral-200 bg-neutral-100 p-1">
    {options.map((option) => {
      const isActive = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive ? "bg-white text-neutral-900 shadow" : "text-neutral-500"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

interface DebouncedTextInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const DebouncedTextInput = ({
  value,
  onChange,
  className,
  placeholder,
}: DebouncedTextInputProps) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (draft !== value) {
        onChange(draft);
      }
    }, 250);

    return () => clearTimeout(handle);
  }, [draft, onChange, value]);

  return (
    <input
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

interface LabelledInputProps {
  label: string;
  input: ReactNode;
}

const LabelledInput = ({ label, input }: LabelledInputProps) => (
  <label className="flex flex-col gap-2">
    <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
      {label}
    </span>
    {input}
  </label>
);
