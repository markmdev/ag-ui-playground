import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function MyChat() {
  const customStyles = `
    /* Layout: full height with scrollable messages */
    .chat-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: scroll;
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
    .copilotKitAssistantMessage {
      font-family: Georgia, serif !important;
      font-size: 14px !important;
    }

    /* Border radius for message bubbles */
    .copilotKitUserMessage,
    .copilotKitAssistantMessage {
      border-radius: 8px !important;
    }

    /* Padding */
    .copilotKitMessages {
      padding: 16px !important;
    }

    .copilotKitInput {
      padding: 16px !important;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <CopilotKit runtimeUrl="/api/copilotkit" agent="agent_es">
        <div
          className="chat-container"
          style={
            {
              "--copilot-kit-primary-color": "#38e898",
              "--copilot-kit-contrast-color": "#30ffcc",
              "--copilot-kit-background-color": "#ffcc89",
              "--copilot-kit-secondary-color": "#f3f4f6",
              "--copilot-kit-secondary-contrast-color": "#1f2937",
              "--copilot-kit-separator-color": "#ea0000",
              "--copilot-kit-muted-color": "#9ca3af",
            } as CopilotKitCSSProperties
          }
        >
          <CopilotChat
            labels={{
              title: "My Assistant",
              initial: "Hola",
              placeholder: "Message....",
            }}
          />
        </div>
      </CopilotKit>
    </>
  );
}
