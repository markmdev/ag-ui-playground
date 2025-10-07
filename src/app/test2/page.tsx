import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function MyChat() {
  const customStyles = `
    .chat-container {
      height: 100% !important;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      border-radius: 16px !important;
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
      font-family: 'Times New Roman', serif !important;
      font-size: 18px !important;
    }

    /* Border radius for message bubbles */
    .copilotKitUserMessage,
    .copilotKitAssistantMessage {
      border-radius: 16px !important;
    }

    /* Padding */
    .copilotKitMessages {
      padding: 20px !important;
    }

    .copilotKitInput {
      padding: 20px !important;
    }

    .copilotKitChat {
      height: 100% !important;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <CopilotKit runtimeUrl="/api/copilotkit" agent="sample_agent">
        <div className="h-[700px] w-1/2">
          <div
            className="chat-container"
            style={
              {
                "--copilot-kit-primary-color": "#6366f1",
                "--copilot-kit-contrast-color": "#ffffff",
                "--copilot-kit-background-color": "#e9f2ff",
                "--copilot-kit-secondary-color": "#f3f4f6",
                "--copilot-kit-secondary-contrast-color": "#1f2937",
                "--copilot-kit-separator-color": "#ea8398",
                "--copilot-kit-muted-color": "#9ca3af",
              } as CopilotKitCSSProperties
            }
          >
            <CopilotChat
              labels={{
                title: "My Assistant",
                initial: "Hi! How can I help you today?",
                placeholder: "Type your message...",
              }}
            />
          </div>
        </div>
      </CopilotKit>
    </>
  );
}
