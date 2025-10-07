import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@ag-ui/langgraph";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  // Get AG-UI URL and agent name from headers (passed from preview page)
  const agUiUrl = req.headers.get("x-ag-ui-url") || "http://localhost:8123";
  const agentName = req.headers.get("x-agent-name") || "sample_agent";

  const serviceAdapter = new ExperimentalEmptyAdapter();

  // Create runtime with dynamic URL
  const runtime = new CopilotRuntime({
    agents: {
      [agentName]: new LangGraphAgent({
        deploymentUrl: agUiUrl,
        graphId: agentName,
        langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
      }),
    },
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit-preview",
  });

  return handleRequest(req);
};
