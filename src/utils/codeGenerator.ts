import { PlaygroundConfig } from "@/types/playground";

export type ExportFormat = "props" | "css" | "hybrid";

export interface ExportedFiles {
  component: string;
  apiRoute: string;
  envVars: string;
}

export function generateExportFiles(config: PlaygroundConfig): ExportedFiles {
  // Extract individual parts from hybrid code
  const reactCode = `import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function MyChat() {
  const customStyles = \`
    .chat-container {
      height: 100% !important;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      border-radius: ${config.style.borderRadius} !important;
    }

    .chat-container .copilotKitMessages {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
    }

    .chat-container .copilotKitInput {
      flex: 0 0 auto;
    }

    /* Typography */
    .copilotKitMessages,
    .copilotKitInput,
    .copilotKitUserMessage,
    .copilotKitAssistantMessage,
    .copilotKitMarkdownElement {
      font-family: ${config.typography.fontFamily} !important;
      font-size: ${config.typography.fontSize} !important;
    }

    /* Border radius for message bubbles */
    .copilotKitUserMessage,
    .copilotKitAssistantMessage {
      border-radius: ${config.style.bubbleBorderRadius} !important;
    }

    /* Padding */
    .copilotKitMessages {
      padding: ${config.style.padding} !important;
    }

    .copilotKitInput {
      padding: ${config.style.padding} !important;
    }

    .copilotKitChat {
      height: 100% !important;
    }
  \`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <CopilotKit runtimeUrl="/api/copilotkit" agent="${config.agentConfig.agentName}">
        <div
          className="chat-container"
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
      </CopilotKit>
    </>
  );
}`;

  const apiRouteCode = `import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { LangGraphAgent } from "@ag-ui/langgraph";
import { NextRequest } from "next/server";

const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    [process.env.LANGGRAPH_GRAPH_ID || "${config.agentConfig.agentName}"]: new LangGraphAgent({
      deploymentUrl: process.env.LANGGRAPH_DEPLOYMENT_URL || "${config.agentConfig.agUiUrl}",
      graphId: process.env.LANGGRAPH_GRAPH_ID || "${config.agentConfig.agentName}",
      langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
    }),
  }
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};`;

  const envFileCode = `LANGGRAPH_DEPLOYMENT_URL=${config.agentConfig.agUiUrl}
LANGGRAPH_GRAPH_ID=${config.agentConfig.agentName}
LANGSMITH_API_KEY=`;

  return {
    component: reactCode,
    apiRoute: apiRouteCode,
    envVars: envFileCode,
  };
}
