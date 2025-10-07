export interface PlaygroundConfig {
  // Agent configuration
  agentConfig: {
    agUiUrl: string;
    agentName: string;
  };

  // Text customization
  labels: {
    title: string;
    initial: string;
    placeholder: string;
  };

  // Color scheme (CSS variables)
  colors: {
    primary: string;
    contrast: string;
    background: string;
    secondary: string;
    secondaryContrast: string;
    separator: string;
    muted: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    fontSize: string;
  };

  // Style properties
  style: {
    borderRadius: string;
    padding: string;
  };
}

export const DEFAULT_CONFIG: PlaygroundConfig = {
  agentConfig: {
    agUiUrl: "http://localhost:8123",
    agentName: "sample_agent",
  },
  labels: {
    title: "My Assistant",
    initial: "Hi! How can I help you today?",
    placeholder: "Type your message...",
  },
  colors: {
    primary: "#6366f1",
    contrast: "#ffffff",
    background: "#ffffff",
    secondary: "#f3f4f6",
    secondaryContrast: "#1f2937",
    separator: "#e5e7eb",
    muted: "#9ca3af",
  },
  typography: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: "14px",
  },
  style: {
    borderRadius: "8px",
    padding: "16px",
  },
};
