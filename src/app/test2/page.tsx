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
      border-radius: 8px !important;
    }

    /* Typography */
    .copilotKitMessages,
    .copilotKitInput,
    .copilotKitUserMessage,
    .copilotKitAssistantMessage,
    .copilotKitMarkdownElement {
      font-family: system-ui, -apple-system, sans-serif !important;
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
      background-color: #1e3513 !important;
    }

    .copilotKitInput input,
    .copilotKitInput textarea,
    .copilotKitInput [contenteditable] {
      background-color: #1e3513 !important;
      color: #f63600 !important;
    }

    .copilotKitChat {
      height: 100% !important;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* <CopilotKit runtimeUrl="/api/copilotkit" agent="agent_es"> */}
      <div className="w-1/2 h-[500px]">
        <div
          className="chat-container"
          style={
            {
              "--copilot-kit-primary-color": "#3bed00",
              "--copilot-kit-contrast-color": "#ea0d00",
              "--copilot-kit-background-color": "#4e004e",
              "--copilot-kit-secondary-color": "#344e20",
              "--copilot-kit-secondary-contrast-color": "#f63600",
              "--copilot-kit-separator-color": "#07bb00",
              "--copilot-kit-muted-color": "#6673ab",
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
      {/* </CopilotKit> */}
    </>
  );
}
