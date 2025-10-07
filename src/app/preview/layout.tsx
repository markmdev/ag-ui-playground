"use client";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { useSearchParams } from "next/navigation";
import { ReactNode, useMemo } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const agUiUrl = searchParams.get("agUiUrl") || "http://localhost:8123";
  const agentName = searchParams.get("agentName") || "sample_agent";

  // Create custom headers for the runtime
  const headers = useMemo(
    () => ({
      "x-ag-ui-url": agUiUrl,
      "x-agent-name": agentName,
    }),
    [agUiUrl, agentName]
  );

  return (
    <html lang="en">
      <body>
        <CopilotKit
          runtimeUrl="/api/copilotkit-preview"
          agent={agentName}
          headers={headers}
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
