"use client";

import { useEffect, useState } from "react";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { PlaygroundConfig } from "@/types/playground";

export default function PreviewPage() {
  const [config, setConfig] = useState<PlaygroundConfig | null>(null);

  useEffect(() => {
    // Listen for config updates from parent window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "UPDATE_CONFIG") {
        setConfig(event.data.config);
      }
    };

    window.addEventListener("message", handleMessage);

    // Signal to parent that iframe is ready
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!config) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading preview...</p>
      </div>
    );
  }

  // Generate custom CSS for typography and style
  const customStyles = `
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
    }
  `;

  const cssVariables = {
    "--copilot-kit-primary-color": config.colors.primary,
    "--copilot-kit-contrast-color": config.colors.contrast,
    "--copilot-kit-background-color": config.colors.background,
    "--copilot-kit-secondary-color": config.colors.secondary,
    "--copilot-kit-secondary-contrast-color": config.colors.secondaryContrast,
    "--copilot-kit-separator-color": config.colors.separator,
    "--copilot-kit-muted-color": config.colors.muted,
  } as CopilotKitCSSProperties;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div style={cssVariables} className="h-screen w-screen">
        <CopilotChat
          labels={{
            title: config.labels.title,
            initial: config.labels.initial,
            placeholder: config.labels.placeholder,
          }}
        />
      </div>
    </>
  );
}
