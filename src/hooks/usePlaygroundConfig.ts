"use client";

import { useState, useCallback } from "react";
import { PlaygroundConfig, DEFAULT_CONFIG } from "@/types/playground";

export function usePlaygroundConfig() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);

  const updateLabel = useCallback(
    (key: keyof PlaygroundConfig["labels"], value: string) => {
      setConfig((prev) => ({
        ...prev,
        labels: {
          ...prev.labels,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateColor = useCallback(
    (key: keyof PlaygroundConfig["colors"], value: string) => {
      setConfig((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateTypography = useCallback(
    (key: keyof PlaygroundConfig["typography"], value: string) => {
      setConfig((prev) => ({
        ...prev,
        typography: {
          ...prev.typography,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateStyle = useCallback(
    (key: keyof PlaygroundConfig["style"], value: string) => {
      setConfig((prev) => ({
        ...prev,
        style: {
          ...prev.style,
          [key]: value,
        },
      }));
    },
    []
  );

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return {
    config,
    updateLabel,
    updateColor,
    updateTypography,
    updateStyle,
    resetConfig,
  };
}
