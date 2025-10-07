"use client";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CopilotKit
          runtimeUrl="/api/copilotkit-preview"
          agent="sample_agent"
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
