import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_PLAYGROUND_CONFIG,
  PLAYGROUND_PRESETS,
  STARTER_PROMPT_PRESETS,
  clonePlaygroundConfig,
  findMatchingPreset,
  isConfigEqual,
} from "@/lib/playground-config";
import type {
  PlaygroundConfig,
  PlaygroundPreset,
  StarterPromptPreset,
} from "@/lib/playground-config";

export interface PlaygroundConfigActions {
  updateRoot: (partial: Partial<PlaygroundConfig>) => void;
  updateTypography: (
    partial: Partial<PlaygroundConfig["typography"]>,
  ) => void;
  updateStyle: (partial: Partial<PlaygroundConfig["style"]>) => void;
  updateStartScreen: (
    partial: Partial<PlaygroundConfig["startScreen"]>,
  ) => void;
  updateComposer: (
    partial: Partial<PlaygroundConfig["composer"]>,
  ) => void;
  updateOptions: (
    updater: (options: PlaygroundConfig["options"]) => PlaygroundConfig["options"],
  ) => void;
  applyPreset: (presetId: string) => void;
  resetConfig: () => void;
  replaceConfig: (config: PlaygroundConfig) => void;
}

export interface PlaygroundConfigState {
  config: PlaygroundConfig;
  actions: PlaygroundConfigActions;
  presets: PlaygroundPreset[];
  starterPromptPresets: StarterPromptPreset[];
  activePresetId?: string;
  isDirty: boolean;
}

const createDefaultConfig = () => clonePlaygroundConfig(DEFAULT_PLAYGROUND_CONFIG);

export const usePlaygroundConfig = (): PlaygroundConfigState => {
  const [config, setConfig] = useState<PlaygroundConfig>(createDefaultConfig);

  const updateRoot = useCallback((partial: Partial<PlaygroundConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateTypography = useCallback(
    (partial: Partial<PlaygroundConfig["typography"]>) => {
      setConfig((prev) => ({
        ...prev,
        typography: { ...prev.typography, ...partial },
      }));
    },
    [],
  );

  const updateStyle = useCallback(
    (partial: Partial<PlaygroundConfig["style"]>) => {
      setConfig((prev) => ({ ...prev, style: { ...prev.style, ...partial } }));
    },
    [],
  );

  const updateStartScreen = useCallback(
    (partial: Partial<PlaygroundConfig["startScreen"]>) => {
      setConfig((prev) => ({
        ...prev,
        startScreen: { ...prev.startScreen, ...partial },
      }));
    },
    [],
  );

  const updateComposer = useCallback(
    (partial: Partial<PlaygroundConfig["composer"]>) => {
      setConfig((prev) => ({
        ...prev,
        composer: { ...prev.composer, ...partial },
      }));
    },
    [],
  );

  const updateOptions = useCallback(
    (
      updater: (
        options: PlaygroundConfig["options"],
      ) => PlaygroundConfig["options"],
    ) => {
      setConfig((prev) => ({
        ...prev,
        options: updater(prev.options),
      }));
    },
    [],
  );

  const applyPreset = useCallback((presetId: string) => {
    const preset = PLAYGROUND_PRESETS.find((item) => item.id === presetId);
    if (!preset) {
      return;
    }

    setConfig(clonePlaygroundConfig(preset.config));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(createDefaultConfig());
  }, []);

  const replaceConfig = useCallback((nextConfig: PlaygroundConfig) => {
    setConfig(clonePlaygroundConfig(nextConfig));
  }, []);

  const activePresetId = useMemo(
    () => findMatchingPreset(config)?.id,
    [config],
  );

  const isDirty = useMemo(
    () => !isConfigEqual(config, DEFAULT_PLAYGROUND_CONFIG),
    [config],
  );

  return {
    config,
    actions: {
      updateRoot,
      updateTypography,
      updateStyle,
      updateStartScreen,
      updateComposer,
      updateOptions,
      applyPreset,
      resetConfig,
      replaceConfig,
    },
    presets: PLAYGROUND_PRESETS,
    starterPromptPresets: STARTER_PROMPT_PRESETS,
    activePresetId,
    isDirty,
  };
};
