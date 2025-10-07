import type { PlaygroundConfig } from "@/lib/playground-config";
import { buildCssVariables } from "@/lib/playground-config";

const radiusClassName: Record<string, string> = {
  none: "rounded-none",
  small: "rounded-xl",
  medium: "rounded-2xl",
  pill: "rounded-[32px]",
};

const densityClassName: Record<string, string> = {
  compact: "p-3",
  normal: "p-4",
  comfortable: "p-5",
};

const escapeString = (input: string): string =>
  input
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/\n/g, "\\n");

const formatCssVariables = (config: PlaygroundConfig): string => {
  const variables = buildCssVariables(config);
  const entries = Object.entries(variables)
    .filter(([key]) => key.startsWith("--") || key === "fontFamily" || key === "fontSize")
    .map(
      ([key, value]) =>
        `  "${key}": "${String(value).replace(/"/g, '\\"')}",`,
    );

  return `const appearance: CopilotKitCSSProperties = {\n${entries.join(
    "\n",
  )}\n};`;
};

const formatStarterPrompts = (config: PlaygroundConfig): string => {
  if (config.startScreen.starterPrompts.length === 0) {
    return "const starterPrompts: CopilotChatSuggestion[] = [];";
  }

  const items = config.startScreen.starterPrompts
    .map((prompt) => {
      const escaped = escapeString(prompt);
      return `  { title: \`${escaped}\`, message: \`${escaped}\` },`;
    })
    .join("\n");

  return `const starterPrompts: CopilotChatSuggestion[] = [\n${items}\n];`;
};

export const generateCodeSnippet = (config: PlaygroundConfig): string => {
  const appearanceBlock = formatCssVariables(config);
  const promptsBlock = formatStarterPrompts(config);

  const snippet = `import { CopilotKit } from "@copilotkit/react-core";
import {
  CopilotPopup,
  type CopilotChatSuggestion,
  type CopilotKitCSSProperties,
  type RenderSuggestionsListProps,
} from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

${appearanceBlock}

${promptsBlock}

const radiusClass = "${radiusClassName[config.style.radius]}";
const densityClass = "${densityClassName[config.style.density]}";

const StarterPrompts = ({
  onSuggestionClick,
  suggestions,
}: RenderSuggestionsListProps) => {
  const items = suggestions.length > 0 ? suggestions : starterPrompts;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-1 pt-2">
      {items.map((item, index) => (
        <button
          key={\`\${item.message}-\${index}\`}
          onClick={() => onSuggestionClick(item.message)}
          className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export const CopilotPlayground = () => (
  <CopilotKit runtimeUrl="/api/copilotkit" agent="sample_agent">
    <div className={\`playground-shell \${radiusClass} \${densityClass}\`} style={appearance}>
      <CopilotPopup
        defaultOpen
        clickOutsideToClose={false}
        labels={{
          title: \`${escapeString(config.startScreen.greeting)}\`,
          placeholder: \`${escapeString(config.composer.placeholder)}\`,
          initial: \`${escapeString(config.startScreen.greeting)}\`,
        }}
        imageUploadsEnabled={${config.composer.attachments}}
        RenderSuggestionsList={(props) => <StarterPrompts {...props} />}
      />
      <p className="px-4 pb-4 text-xs text-neutral-400">
        ${escapeString(config.composer.disclaimer)}
      </p>
    </div>
  </CopilotKit>
);`;

  return snippet;
};
