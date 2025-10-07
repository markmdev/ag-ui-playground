import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function MyChat() {
  const customStyles = `
    /* Layout: full height with scrollable messages */
    .chat-container {
      height: 100% !important;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      border-radius: 16px !important;
    }

    /* Typography */
    .copilotKitMessages,
    .copilotKitUserMessage,
    .copilotKitAssistantMessage,
    .copilotKitMarkdownElement {
      font-family: 'Times New Roman', serif !important;
      font-size: 16px !important;
    }

    /* Border radius for message bubbles */
    .copilotKitUserMessage,
    .copilotKitAssistantMessage {
      border-radius: 20px !important;
    }

    /* Padding */
    .copilotKitMessages {
      padding: 16px !important;
    }

    .copilotKitInput {
      padding: 16px !important;
    }

    .copilotKitChat {
      height: 100% !important;
    }

  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <CopilotKit runtimeUrl="/api/copilotkit" agent="agent_es">
        <div className="bg-red-200 h-[700px]">
          <div
            className="chat-container w-1/2 bg-blue-200"
            style={
              {
                "--copilot-kit-primary-color": "#e8ab01",
                "--copilot-kit-contrast-color": "#ffffff",
                "--copilot-kit-background-color": "#fff8db",
                "--copilot-kit-secondary-color": "#f3f4f6",
                "--copilot-kit-secondary-contrast-color": "#1f2937",
                "--copilot-kit-separator-color": "#3168ea",
                "--copilot-kit-muted-color": "#9ca3af",
              } as CopilotKitCSSProperties
            }
          >
            <CopilotChat
              labels={{
                title: "My Assistant",
                initial: "Hi!",
                placeholder: "MESSAGE!!!",
              }}
            />
          </div>
        </div>
      </CopilotKit>
    </>
  );
}
