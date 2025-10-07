// MyChat.tsx
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "./custom-copilot.css"; // Import your custom CSS

export default function MyChat() {
  return (
    <div
      style={
        {
          "--copilot-kit-primary-color": "#72e8c5",
          "--copilot-kit-contrast-color": "#ff00e5",
          "--copilot-kit-background-color": "#ffd6b3",
          "--copilot-kit-secondary-color": "#a4f58a",
          "--copilot-kit-secondary-contrast-color": "#0e3435",
          "--copilot-kit-separator-color": "#ea001f",
          "--copilot-kit-muted-color": "#3aad8d",
        } as CopilotKitCSSProperties
      }
    >
      <CopilotChat
        labels={{
          title: "My Assistant",
          initial: "Hi! What do you want?",
          placeholder: "Please type your message",
        }}
      />
    </div>
  );
}
