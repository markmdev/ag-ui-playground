"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  CopilotPopup,
  type InputProps,
  type RenderSuggestionsListProps,
  useChatContext,
} from "@copilotkit/react-ui";
import type { PlaygroundConfig } from "@/lib/playground-config";
import { buildCssVariables } from "@/lib/playground-config";
import type { PlaygroundDensity } from "@/lib/playground-config";

export interface PreviewPanelProps {
  config: PlaygroundConfig;
}

export const PreviewPanel = ({ config }: PreviewPanelProps) => {
  const fallbackSuggestions = useMemo(
    () =>
      config.startScreen.starterPrompts.map((prompt) => ({
        title: prompt,
        message: prompt,
      })),
    [config.startScreen.starterPrompts],
  );

  const styleVariables = useMemo(
    () =>
      ({
        ...buildCssVariables(config),
        "--playground-radius":
          radiusToPixels[config.style.radius] ?? radiusToPixels.medium,
        "--playground-density":
          densityToPadding[config.style.density] ?? densityToPadding.normal,
        "--playground-density-gap":
          densityToGap[config.style.density] ?? densityToGap.normal,
      }) as CSSProperties,
    [config],
  );

  const surfaceBackground =
    config.colorScheme === "light"
      ? "linear-gradient(180deg, #f8fafc 0%, #eef2ff 60%, #e2e8f0 100%)"
      : "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1120 100%)";

  return (
    <section className="flex flex-1 flex-col bg-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white/80 px-8 py-6 backdrop-blur">
        <div>
          <h2 className="text-sm font-semibold text-neutral-700">
            Watch chat examples
          </h2>
          <p className="text-xs text-neutral-500">
            Live CopilotKit preview updates with every change.
          </p>
        </div>
        <div className="hidden text-xs text-neutral-400 md:block">
          {config.typography.fontFamily} · {config.typography.fontSize} ·{" "}
          {config.style.radius} radius
        </div>
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-6 sm:px-8">
        <div
          className="relative flex w-full max-w-[520px] flex-col rounded-[36px] bg-white shadow-2xl ring-1 ring-black/5"
          style={{
            background: surfaceBackground,
          }}
        >
          <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-white/40 via-white/10 to-black/10 blur-3xl" />
          <div className="flex flex-col gap-4 rounded-[36px] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/30 text-lg font-semibold text-neutral-900 shadow"
                  style={{ color: config.accentColor }}
                >
                  ✨
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-600">
                    Start screen
                  </p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {config.startScreen.greeting}
                  </p>
                </div>
              </div>
              <div className="text-xs text-neutral-500">Preview</div>
            </div>

            <ul className="flex flex-col gap-2 rounded-3xl bg-white/60 p-4 text-sm text-neutral-600 shadow-inner">
              {config.startScreen.starterPrompts.slice(0, 4).map((prompt) => (
                <li
                  key={prompt}
                  className="flex items-center gap-3 rounded-2xl bg-white/90 px-3 py-2 shadow-sm"
                >
                  <span className="text-neutral-400">●</span>
                  <span className="text-neutral-700">{prompt}</span>
                </li>
              ))}
              {config.startScreen.starterPrompts.length === 0 && (
                <li className="rounded-2xl border border-dashed border-neutral-300 px-3 py-3 text-center text-xs text-neutral-400">
                  No starter prompts configured.
                </li>
              )}
            </ul>
          </div>

          <div className="relative mt-4 flex flex-col rounded-t-[32px] bg-white/80 px-4 pb-8 pt-6 shadow-[0_-10px_45px_-20px_rgba(15,23,42,0.25)]">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: config.accentColor,
                  }}
                />
                <p className="text-xs font-medium text-neutral-500">
                  Copilot preview
                </p>
              </div>
              <span className="text-xs text-neutral-400">Live</span>
            </div>

            <div
              className="playground-preview relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-lg"
              style={styleVariables}
            >
              {(config.options.modelPicker ||
                config.options.toolMenu.searchDocs ||
                config.options.toolMenu.createTheme) && (
                <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400">
                  {config.options.modelPicker ? (
                    <div
                      className="pointer-events-auto rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white shadow"
                      style={{ backgroundColor: config.accentColor }}
                    >
                      Model · gpt-4o-mini
                    </div>
                  ) : (
                    <span />
                  )}
                  <div className="flex gap-2">
                    {config.options.toolMenu.searchDocs && (
                      <span className="rounded-full border border-neutral-300 bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-500 shadow-sm">
                        Search docs
                      </span>
                    )}
                    {config.options.toolMenu.createTheme && (
                      <span className="rounded-full border border-neutral-300 bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-500 shadow-sm">
                        Create theme
                      </span>
                    )}
                  </div>
                </div>
              )}
              <CopilotPopup
                defaultOpen={true}
                clickOutsideToClose={false}
                hitEscapeToClose={false}
                className="playground-preview-popup"
                labels={{
                  title: "Playground Copilot",
                  placeholder: config.composer.placeholder,
                  initial: config.startScreen.greeting,
                }}
                imageUploadsEnabled={config.composer.attachments}
                RenderSuggestionsList={(props) => (
                  <PreviewSuggestions
                    {...props}
                    fallback={fallbackSuggestions}
                  />
                )}
                Input={(props) => (
                  <PreviewComposer
                    {...props}
                    disclaimer={config.composer.disclaimer}
                    density={config.style.density}
                    attachmentsEnabled={config.composer.attachments}
                  />
                )}
              />
              {(config.options.messageActions.copy ||
                config.options.messageActions.share) && (
                <div className="pointer-events-none absolute bottom-4 right-4 flex gap-2 text-[11px] font-medium text-neutral-400">
                  {config.options.messageActions.copy && (
                    <span className="rounded-full bg-neutral-900/10 px-3 py-1">
                      Copy action
                    </span>
                  )}
                  {config.options.messageActions.share && (
                    <span className="rounded-full bg-neutral-900/10 px-3 py-1">
                      Share action
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PreviewComposerProps extends InputProps {
  disclaimer: string;
  density: PlaygroundDensity;
  attachmentsEnabled: boolean;
}

const PreviewComposer = ({
  disclaimer,
  density,
  attachmentsEnabled,
  inProgress,
  hideStopButton,
  onSend,
  onStop,
  onUpload,
}: PreviewComposerProps) => {
  const [draft, setDraft] = useState("");
  const context = useChatContext();

  const sendMessage = async () => {
    if (!draft.trim()) {
      return;
    }
    await onSend(draft.trim());
    setDraft("");
  };

  const canSend = draft.trim().length > 0 && !inProgress;
  const canStop = inProgress && !hideStopButton;

  return (
    <div
      className="flex flex-col gap-2"
      style={{ padding: densityToComposerPadding[density] ?? "1rem" }}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={context.labels.placeholder}
          rows={2}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (canSend) {
                void sendMessage();
              }
            }
          }}
          className="min-h-[48px] flex-1 resize-none bg-transparent text-sm text-neutral-800 outline-none"
        />
        <div className="flex flex-col items-end gap-3">
          {attachmentsEnabled && onUpload ? (
            <button
              type="button"
              onClick={onUpload}
              className="rounded-full border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-500 transition hover:text-neutral-800"
            >
              Attach
            </button>
          ) : null}
          <button
            type="button"
            disabled={!canSend && !canStop}
            onClick={canStop ? onStop : sendMessage}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-700 disabled:bg-neutral-200"
          >
            {canStop ? "■" : context.icons.sendIcon}
          </button>
        </div>
      </div>
      {disclaimer ? (
        <p className="px-1 text-xs text-neutral-400">{disclaimer}</p>
      ) : null}
    </div>
  );
};

interface PreviewSuggestionsProps extends RenderSuggestionsListProps {
  fallback: Array<{ title: string; message: string }>;
}

const PreviewSuggestions = ({
  suggestions,
  onSuggestionClick,
  fallback,
}: PreviewSuggestionsProps) => {
  const items = suggestions.length > 0 ? suggestions : fallback;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="playground-suggestions flex flex-wrap gap-2 px-4 pb-1 pt-2">
      {items.map((item, index) => (
        <button
          key={`${item.message}-${index}`}
          type="button"
          onClick={() => onSuggestionClick(item.message)}
          className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

const radiusToPixels: Record<string, string> = {
  none: "0px",
  small: "12px",
  medium: "22px",
  pill: "32px",
};

const densityToPadding: Record<string, string> = {
  compact: "0.65rem",
  normal: "0.85rem",
  comfortable: "1.15rem",
};

const densityToGap: Record<string, string> = {
  compact: "0.65rem",
  normal: "0.9rem",
  comfortable: "1.25rem",
};

const densityToComposerPadding: Record<PlaygroundDensity, string> = {
  compact: "0.6rem 0.65rem 0.75rem",
  normal: "0.85rem 0.9rem 1rem",
  comfortable: "1.15rem 1.2rem 1.25rem",
};
