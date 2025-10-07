import { PlaygroundConfig } from "@/types/playground";

export function generatePropsBasedCode(config: PlaygroundConfig): string {
  return `import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export function MyChat() {
  return (
    <div
      style={{
        "--copilot-kit-primary-color": "${config.colors.primary}",
        "--copilot-kit-contrast-color": "${config.colors.contrast}",
        "--copilot-kit-background-color": "${config.colors.background}",
        "--copilot-kit-secondary-color": "${config.colors.secondary}",
        "--copilot-kit-secondary-contrast-color": "${config.colors.secondaryContrast}",
        "--copilot-kit-separator-color": "${config.colors.separator}",
        "--copilot-kit-muted-color": "${config.colors.muted}",
      } as CopilotKitCSSProperties}
    >
      <CopilotChat
        labels={{
          title: "${config.labels.title}",
          initial: "${config.labels.initial}",
          placeholder: "${config.labels.placeholder}",
        }}
      />
    </div>
  );
}`;
}

export function generateCSSCode(config: PlaygroundConfig): string {
  return `:root {
  --copilot-kit-primary-color: ${config.colors.primary};
  --copilot-kit-contrast-color: ${config.colors.contrast};
  --copilot-kit-background-color: ${config.colors.background};
  --copilot-kit-secondary-color: ${config.colors.secondary};
  --copilot-kit-secondary-contrast-color: ${config.colors.secondaryContrast};
  --copilot-kit-separator-color: ${config.colors.separator};
  --copilot-kit-muted-color: ${config.colors.muted};
}

.copilotKitMessages,
.copilotKitInput,
.copilotKitMessage {
  font-family: ${config.typography.fontFamily};
  font-size: ${config.typography.fontSize};
}

.copilotKitUserMessage,
.copilotKitAssistantMessage {
  border-radius: ${config.style.borderRadius};
}

.copilotKitMessages {
  padding: ${config.style.padding};
}

.copilotKitInput {
  padding: ${config.style.padding};
}`;
}

export function generateHybridCode(config: PlaygroundConfig): string {
  const reactCode = `import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "./custom-copilot.css"; // Import your custom CSS

export function MyChat() {
  return (
    <div
      style={{
        "--copilot-kit-primary-color": "${config.colors.primary}",
        "--copilot-kit-contrast-color": "${config.colors.contrast}",
        "--copilot-kit-background-color": "${config.colors.background}",
        "--copilot-kit-secondary-color": "${config.colors.secondary}",
        "--copilot-kit-secondary-contrast-color": "${config.colors.secondaryContrast}",
        "--copilot-kit-separator-color": "${config.colors.separator}",
        "--copilot-kit-muted-color": "${config.colors.muted}",
      } as CopilotKitCSSProperties}
    >
      <CopilotChat
        labels={{
          title: "${config.labels.title}",
          initial: "${config.labels.initial}",
          placeholder: "${config.labels.placeholder}",
        }}
      />
    </div>
  );
}`;

  const cssCode = `.copilotKitMessages,
.copilotKitInput,
.copilotKitMessage {
  font-family: ${config.typography.fontFamily};
  font-size: ${config.typography.fontSize};
}

.copilotKitUserMessage,
.copilotKitAssistantMessage {
  border-radius: ${config.style.borderRadius};
}

.copilotKitMessages {
  padding: ${config.style.padding};
}

.copilotKitInput {
  padding: ${config.style.padding};
}`;

  return `// MyChat.tsx
${reactCode}

// custom-copilot.css
${cssCode}`;
}

export type ExportFormat = "props" | "css" | "hybrid";

export function generateCode(
  config: PlaygroundConfig,
  format: ExportFormat
): string {
  switch (format) {
    case "props":
      return generatePropsBasedCode(config);
    case "css":
      return generateCSSCode(config);
    case "hybrid":
      return generateHybridCode(config);
    default:
      return generateHybridCode(config);
  }
}
