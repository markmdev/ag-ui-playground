"use client";

import { PlaygroundConfig } from "@/types/playground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SettingsPanelProps {
  config: PlaygroundConfig;
  onUpdateAgentConfig: (key: keyof PlaygroundConfig["agentConfig"], value: string) => void;
  onUpdateLabel: (key: keyof PlaygroundConfig["labels"], value: string) => void;
  onUpdateColor: (key: keyof PlaygroundConfig["colors"], value: string) => void;
  onUpdateTypography: (key: keyof PlaygroundConfig["typography"], value: string) => void;
  onUpdateStyle: (key: keyof PlaygroundConfig["style"], value: string) => void;
  onUpdateColorScheme: (scheme: "light" | "dark") => void;
  onReset: () => void;
}

export function SettingsPanel({
  config,
  onUpdateAgentConfig,
  onUpdateLabel,
  onUpdateColor,
  onUpdateTypography,
  onUpdateStyle,
  onUpdateColorScheme,
  onReset,
}: SettingsPanelProps) {
  return (
    <div className="w-96 h-screen border-r bg-muted/20">
      <div className="flex items-center justify-between p-6 border-b bg-background/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="px-4 py-6 space-y-6">
          {/* Agent Configuration Section */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Agent Configuration</h3>
            <p className="text-xs text-muted-foreground mb-4">Configure your agent settings</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="agUiUrl" className="text-xs font-medium whitespace-nowrap">
                  AG-UI URL
                </Label>
                <Input
                  id="agUiUrl"
                  type="text"
                  value={config.agentConfig.agUiUrl}
                  onChange={(e) => onUpdateAgentConfig("agUiUrl", e.target.value)}
                  placeholder="http://localhost:8123"
                  className="w-48"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="agentName" className="text-xs font-medium whitespace-nowrap">
                  Agent Name
                </Label>
                <Input
                  id="agentName"
                  type="text"
                  value={config.agentConfig.agentName}
                  onChange={(e) => onUpdateAgentConfig("agentName", e.target.value)}
                  placeholder="sample_agent"
                  className="w-48"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Text Customization Section */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Text</h3>
            <p className="text-xs text-muted-foreground mb-4">Customize chat text and labels</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="title" className="text-xs font-medium whitespace-nowrap">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={config.labels.title}
                  onChange={(e) => onUpdateLabel("title", e.target.value)}
                  className="w-48"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="initial" className="text-xs font-medium whitespace-nowrap">
                  Initial Message
                </Label>
                <Textarea
                  id="initial"
                  value={config.labels.initial}
                  onChange={(e) => onUpdateLabel("initial", e.target.value)}
                  rows={2}
                  className="resize-none w-48"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="placeholder" className="text-xs font-medium whitespace-nowrap">
                  Placeholder
                </Label>
                <Input
                  id="placeholder"
                  type="text"
                  value={config.labels.placeholder}
                  onChange={(e) => onUpdateLabel("placeholder", e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Color Scheme Section */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Colors</h3>
            <p className="text-xs text-muted-foreground mb-4">Customize the color scheme</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="colorScheme" className="text-xs font-medium whitespace-nowrap">
                  Color Scheme
                </Label>
                <Select
                  value={config.colorScheme}
                  onValueChange={(value) => onUpdateColorScheme(value as "light" | "dark")}
                >
                  <SelectTrigger id="colorScheme" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ColorInput
                label="User Message Bubble"
                value={config.colors.primary}
                onChange={(value) => onUpdateColor("primary", value)}
              />
              <ColorInput
                label="User Message Text"
                value={config.colors.contrast}
                onChange={(value) => onUpdateColor("contrast", value)}
              />
              <ColorInput
                label="Background"
                value={config.colors.background}
                onChange={(value) => onUpdateColor("background", value)}
              />
              <ColorInput
                label="Input Background"
                value={config.colors.inputBackground}
                onChange={(value) => onUpdateColor("inputBackground", value)}
              />
              <ColorInput
                label="Secondary"
                value={config.colors.secondary}
                onChange={(value) => onUpdateColor("secondary", value)}
              />
              <ColorInput
                label="Assistant Message Text"
                value={config.colors.secondaryContrast}
                onChange={(value) => onUpdateColor("secondaryContrast", value)}
              />
              <ColorInput
                label="Border"
                value={config.colors.separator}
                onChange={(value) => onUpdateColor("separator", value)}
              />
              <ColorInput
                label="Additional Elements"
                value={config.colors.muted}
                onChange={(value) => onUpdateColor("muted", value)}
              />
            </div>
          </div>

          <Separator />

          {/* Typography Section */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Typography</h3>
            <p className="text-xs text-muted-foreground mb-4">Adjust font settings</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="fontFamily" className="text-xs font-medium whitespace-nowrap">
                  Font Family
                </Label>
                <Select
                  value={config.typography.fontFamily}
                  onValueChange={(value) => onUpdateTypography("fontFamily", value)}
                >
                  <SelectTrigger id="fontFamily" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system-ui, -apple-system, sans-serif">System UI</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                    <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="fontSize" className="text-xs font-medium whitespace-nowrap">
                  Font Size
                </Label>
                <Select
                  value={config.typography.fontSize}
                  onValueChange={(value) => onUpdateTypography("fontSize", value)}
                >
                  <SelectTrigger id="fontSize" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Style Section */}
          <div>
            <h3 className="text-sm font-semibold mb-1">Style</h3>
            <p className="text-xs text-muted-foreground mb-4">Customize visual styling</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="borderRadius" className="text-xs font-medium whitespace-nowrap">
                  Border Radius
                </Label>
                <Select
                  value={config.style.borderRadius}
                  onValueChange={(value) => onUpdateStyle("borderRadius", value)}
                >
                  <SelectTrigger id="borderRadius" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0px">None (0px)</SelectItem>
                    <SelectItem value="4px">Small (4px)</SelectItem>
                    <SelectItem value="8px">Medium (8px)</SelectItem>
                    <SelectItem value="12px">Large (12px)</SelectItem>
                    <SelectItem value="16px">Extra Large (16px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="padding" className="text-xs font-medium whitespace-nowrap">
                  Padding
                </Label>
                <Select
                  value={config.style.padding}
                  onValueChange={(value) => onUpdateStyle("padding", value)}
                >
                  <SelectTrigger id="padding" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8px">Small (8px)</SelectItem>
                    <SelectItem value="12px">Medium (12px)</SelectItem>
                    <SelectItem value="16px">Large (16px)</SelectItem>
                    <SelectItem value="20px">Extra Large (20px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label
                  htmlFor="bubbleBorderRadius"
                  className="text-xs font-medium whitespace-nowrap"
                >
                  Bubble Radius
                </Label>
                <Select
                  value={config.style.bubbleBorderRadius}
                  onValueChange={(value) => onUpdateStyle("bubbleBorderRadius", value)}
                >
                  <SelectTrigger id="bubbleBorderRadius" className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0px">None (0px)</SelectItem>
                    <SelectItem value="4px">Small (4px)</SelectItem>
                    <SelectItem value="8px">Medium (8px)</SelectItem>
                    <SelectItem value="12px">Large (12px)</SelectItem>
                    <SelectItem value="16px">Extra Large (16px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Helper component for color inputs
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-xs font-medium whitespace-nowrap">{label}</Label>
      <div className="flex gap-2 w-48">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 rounded-md border border-input cursor-pointer bg-background flex-shrink-0"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono"
        />
      </div>
    </div>
  );
}
