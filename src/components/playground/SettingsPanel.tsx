"use client";

import { PlaygroundConfig } from "@/types/playground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SettingsPanelProps {
  config: PlaygroundConfig;
  onUpdateAgentConfig: (key: keyof PlaygroundConfig["agentConfig"], value: string) => void;
  onUpdateLabel: (key: keyof PlaygroundConfig["labels"], value: string) => void;
  onUpdateColor: (key: keyof PlaygroundConfig["colors"], value: string) => void;
  onUpdateTypography: (key: keyof PlaygroundConfig["typography"], value: string) => void;
  onUpdateStyle: (key: keyof PlaygroundConfig["style"], value: string) => void;
  onReset: () => void;
}

export function SettingsPanel({
  config,
  onUpdateAgentConfig,
  onUpdateLabel,
  onUpdateColor,
  onUpdateTypography,
  onUpdateStyle,
  onReset,
}: SettingsPanelProps) {
  return (
    <div className="w-80 h-screen border-r bg-muted/20">
      <div className="flex items-center justify-between p-6 border-b bg-background/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Settings</h2>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="p-4 space-y-4">

          {/* Agent Configuration Section */}
          <Card className="shadow-sm border-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Agent Configuration</CardTitle>
              <CardDescription className="text-xs">Configure your agent settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="agUiUrl" className="text-xs font-medium">AG-UI URL</Label>
                <Input
                  id="agUiUrl"
                  type="text"
                  value={config.agentConfig.agUiUrl}
                  onChange={(e) => onUpdateAgentConfig("agUiUrl", e.target.value)}
                  placeholder="http://localhost:8123"
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="agentName" className="text-xs font-medium">Agent Name</Label>
                <Input
                  id="agentName"
                  type="text"
                  value={config.agentConfig.agentName}
                  onChange={(e) => onUpdateAgentConfig("agentName", e.target.value)}
                  placeholder="sample_agent"
                  className="h-9 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Text Customization Section */}
          <Card className="shadow-sm border-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Text</CardTitle>
              <CardDescription className="text-xs">Customize chat text and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-medium">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={config.labels.title}
                  onChange={(e) => onUpdateLabel("title", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="initial" className="text-xs font-medium">Initial Message</Label>
                <Textarea
                  id="initial"
                  value={config.labels.initial}
                  onChange={(e) => onUpdateLabel("initial", e.target.value)}
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="placeholder" className="text-xs font-medium">Placeholder</Label>
                <Input
                  id="placeholder"
                  type="text"
                  value={config.labels.placeholder}
                  onChange={(e) => onUpdateLabel("placeholder", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Color Scheme Section */}
          <Card className="shadow-sm border-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Colors</CardTitle>
              <CardDescription className="text-xs">Customize the color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <ColorInput
                label="Primary"
                value={config.colors.primary}
                onChange={(value) => onUpdateColor("primary", value)}
              />
              <ColorInput
                label="Contrast"
                value={config.colors.contrast}
                onChange={(value) => onUpdateColor("contrast", value)}
              />
              <ColorInput
                label="Background"
                value={config.colors.background}
                onChange={(value) => onUpdateColor("background", value)}
              />
              <ColorInput
                label="Secondary"
                value={config.colors.secondary}
                onChange={(value) => onUpdateColor("secondary", value)}
              />
              <ColorInput
                label="Secondary Contrast"
                value={config.colors.secondaryContrast}
                onChange={(value) => onUpdateColor("secondaryContrast", value)}
              />
              <ColorInput
                label="Separator"
                value={config.colors.separator}
                onChange={(value) => onUpdateColor("separator", value)}
              />
              <ColorInput
                label="Muted"
                value={config.colors.muted}
                onChange={(value) => onUpdateColor("muted", value)}
              />
            </CardContent>
          </Card>

          {/* Typography Section */}
          <Card className="shadow-sm border-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Typography</CardTitle>
              <CardDescription className="text-xs">Adjust font settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="fontFamily" className="text-xs font-medium">Font Family</Label>
                <Select value={config.typography.fontFamily} onValueChange={(value) => onUpdateTypography("fontFamily", value)}>
                  <SelectTrigger id="fontFamily" className="h-9 text-sm">
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

              <div className="space-y-1.5">
                <Label htmlFor="fontSize" className="text-xs font-medium">Font Size</Label>
                <Select value={config.typography.fontSize} onValueChange={(value) => onUpdateTypography("fontSize", value)}>
                  <SelectTrigger id="fontSize" className="h-9 text-sm">
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
            </CardContent>
          </Card>

          {/* Style Section */}
          <Card className="shadow-sm border-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Style</CardTitle>
              <CardDescription className="text-xs">Customize visual styling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="borderRadius" className="text-xs font-medium">Border Radius</Label>
                <Select value={config.style.borderRadius} onValueChange={(value) => onUpdateStyle("borderRadius", value)}>
                  <SelectTrigger id="borderRadius" className="h-9 text-sm">
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

              <div className="space-y-1.5">
                <Label htmlFor="padding" className="text-xs font-medium">Padding</Label>
                <Select value={config.style.padding} onValueChange={(value) => onUpdateStyle("padding", value)}>
                  <SelectTrigger id="padding" className="h-9 text-sm">
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

              <div className="space-y-1.5">
                <Label htmlFor="bubbleBorderRadius" className="text-xs font-medium">Bubble Border Radius</Label>
                <Select value={config.style.bubbleBorderRadius} onValueChange={(value) => onUpdateStyle("bubbleBorderRadius", value)}>
                  <SelectTrigger id="bubbleBorderRadius" className="h-9 text-sm">
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
            </CardContent>
          </Card>
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
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-14 rounded-md border border-input cursor-pointer bg-background"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-9 text-sm font-mono"
        />
      </div>
    </div>
  );
}
