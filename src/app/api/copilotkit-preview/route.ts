import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@ag-ui/langgraph";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const agUiUrl = "http://localhost:8123";
  const agentName = "sample_agent";

  const serviceAdapter = new ExperimentalEmptyAdapter();

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
