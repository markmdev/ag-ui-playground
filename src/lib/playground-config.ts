import type { CopilotKitCSSProperties } from "@copilotkit/react-ui";

export type PlaygroundColorScheme = "light" | "dark";
export type PlaygroundRadius = "none" | "small" | "medium" | "pill";
export type PlaygroundDensity = "compact" | "normal" | "comfortable";

export interface PlaygroundConfig {
  colorScheme: PlaygroundColorScheme;
  accentColor: string;
  customSurfaceColors: boolean;
  tintedGrayscale: boolean;
  typography: {
    fontFamily: string;
    fontSize: string;
  };
  style: {
    radius: PlaygroundRadius;
    density: PlaygroundDensity;
  };
  startScreen: {
    greeting: string;
    starterPrompts: string[];
  };
  composer: {
    placeholder: string;
    disclaimer: string;
    attachments: boolean;
  };
  options: {
    modelPicker: boolean;
    toolMenu: {
      searchDocs: boolean;
      createTheme: boolean;
    };
    messageActions: {
      copy: boolean;
      share: boolean;
    };
  };
}

const DEFAULT_STARTER_PROMPTS = [
  "What is CopilotKit?",
  "Show me an example widget",
  "What can I customize?",
  "How do I use client side tools?",
  "Server side tools",
];

export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  colorScheme: "light",
  accentColor: "#6366f1",
  customSurfaceColors: false,
  tintedGrayscale: false,
  typography: {
    fontFamily: "Open Sans",
    fontSize: "16px",
  },
  style: {
    radius: "pill",
    density: "normal",
  },
  startScreen: {
    greeting: "What can I help with today?",
    starterPrompts: DEFAULT_STARTER_PROMPTS,
  },
  composer: {
    placeholder: "Message the AI",
    disclaimer: "AI can make mistakes",
    attachments: true,
  },
  options: {
    modelPicker: false,
    toolMenu: {
      searchDocs: true,
      createTheme: true,
    },
    messageActions: {
      copy: true,
      share: false,
    },
  },
};

export type StarterPromptPreset = {
  id: string;
  label: string;
  prompts: string[];
};

export const STARTER_PROMPT_PRESETS: StarterPromptPreset[] = [
  { id: "none", label: "None", prompts: [] },
  {
    id: "some",
    label: "Essentials",
    prompts: [
      "What is CopilotKit?",
      "Show me an example widget",
      "How do I customize the UI?",
    ],
  },
  {
    id: "full",
    label: "Full Demo",
    prompts: DEFAULT_STARTER_PROMPTS,
  },
];

const cloneConfig = (config: PlaygroundConfig): PlaygroundConfig =>
  JSON.parse(JSON.stringify(config));

export type PlaygroundPreset = {
  id: string;
  label: string;
  description?: string;
  config: PlaygroundConfig;
};

export const PLAYGROUND_PRESETS: PlaygroundPreset[] = [
  {
    id: "default",
    label: "Default",
    description: "Balanced layout with rounded corners and friendly tone.",
    config: cloneConfig(DEFAULT_PLAYGROUND_CONFIG),
  },
  {
    id: "support-desk",
    label: "Support Desk",
    description: "Warm accent color, compact layout, attachments disabled.",
    config: {
      ...cloneConfig(DEFAULT_PLAYGROUND_CONFIG),
      accentColor: "#f97316",
      style: {
        radius: "medium",
        density: "compact",
      },
      composer: {
        placeholder: "Describe the issue you're facing",
        disclaimer: "We’ll get back as soon as possible.",
        attachments: false,
      },
      startScreen: {
        greeting: "How can we help you today?",
        starterPrompts: [
          "Reset my password",
          "Check order status",
          "Talk to a human agent",
        ],
      },
    },
  },
  {
    id: "dark-terminal",
    label: "Dark Terminal",
    description: "High-contrast terminal style with monospace typography.",
    config: {
      colorScheme: "dark",
      accentColor: "#22d3ee",
      customSurfaceColors: true,
      tintedGrayscale: true,
      typography: {
        fontFamily: "JetBrains Mono",
        fontSize: "15px",
      },
      style: {
        radius: "small",
        density: "compact",
      },
      startScreen: {
        greeting: "Which workflow should I run?",
        starterPrompts: [
          "Deploy staging build",
          "Run integration tests",
          "Show latest errors",
        ],
      },
      composer: {
        placeholder: "Type a command…",
        disclaimer: "Experimental environment. Use with caution.",
        attachments: false,
      },
      options: {
        modelPicker: true,
        toolMenu: {
          searchDocs: false,
          createTheme: true,
        },
        messageActions: {
          copy: true,
          share: true,
        },
      },
    },
  },
];

export const findMatchingPreset = (
  config: PlaygroundConfig,
): PlaygroundPreset | undefined =>
  PLAYGROUND_PRESETS.find(
    (preset) => JSON.stringify(preset.config) === JSON.stringify(config),
  );

export const buildCssVariables = (
  config: PlaygroundConfig,
): CopilotKitCSSProperties => {
  const lightScheme = config.colorScheme === "light";
  const baseBackground = lightScheme ? "#ffffff" : "#111111";
  const basePrimary = lightScheme ? "#1c1c1c" : "#f5f5f5";
  const baseSecondary = lightScheme ? "#ffffff" : "#2c2c2c";
  const baseMuted = lightScheme ? "#c8c8c8" : "#404040";

  const variables: CopilotKitCSSProperties = {
    "--copilot-kit-primary-color": basePrimary,
    "--copilot-kit-contrast-color": "#ffffff",
    "--copilot-kit-background-color": baseBackground,
    "--copilot-kit-secondary-color": baseSecondary,
    "--copilot-kit-secondary-contrast-color": basePrimary,
    "--copilot-kit-muted-color": baseMuted,
    "--copilot-kit-input-background-color": lightScheme ? "#fbfbfb" : "#1f1f1f",
    fontFamily: config.typography.fontFamily,
    fontSize: config.typography.fontSize,
  };

  if (config.customSurfaceColors) {
    variables["--copilot-kit-primary-color"] = config.accentColor;
    variables["--copilot-kit-contrast-color"] = lightScheme ? "#111111" : "#ffffff";
    variables["--copilot-kit-background-color"] = lightScheme
      ? "#ffffff"
      : "#0f172a";
    variables["--copilot-kit-secondary-color"] = lightScheme
      ? "#ffffff"
      : "#1f2937";
    variables["--copilot-kit-secondary-contrast-color"] = lightScheme
      ? "#111827"
      : "#e5e7eb";
  }

  if (config.tintedGrayscale) {
    const tint = config.accentColor;
    variables["--copilot-kit-muted-color"] = tint;
    variables["--copilot-kit-separator-color"] = tint;
  }

  return variables;
};

export const isConfigEqual = (
  a: PlaygroundConfig,
  b: PlaygroundConfig,
): boolean => JSON.stringify(a) === JSON.stringify(b);

export const clonePlaygroundConfig = (
  config: PlaygroundConfig,
): PlaygroundConfig => cloneConfig(config);
