"use client";

import { useState } from "react";
import { PlaygroundConfig } from "@/types/playground";
import { generateExportFiles } from "@/utils/codeGenerator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CodeExporterProps {
  config: PlaygroundConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function CodeExporter({ config, isOpen, onClose }: CodeExporterProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("component");

  const files = generateExportFiles(config);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-3 border-b">
          <DialogTitle className="text-xl">Export Code</DialogTitle>
          <DialogDescription className="text-xs">
            Copy the generated code to integrate the chat component into your application
          </DialogDescription>
        </DialogHeader>

        {/* Instructions */}
        <Card className="mx-6 mt-4 bg-accent/50 border-accent shadow-none">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm flex items-center gap-2">
              📋 Setup Instructions
            </h3>
            <ol className="text-xs space-y-1.5 text-muted-foreground leading-relaxed">
              <li>1. Create <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">MyChat.tsx</code> and paste the component code</li>
              <li>2. <span className="font-semibold text-destructive">⚠️ Replace</span> <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">app/api/copilotkit/route.ts</code> with the API route code</li>
              <li>3. Add environment variables to <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code></li>
            </ol>
          </CardContent>
        </Card>

        {/* File Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col px-6 pb-6 pt-4 overflow-hidden">
          <TabsList className="w-full justify-start h-9">
            <TabsTrigger value="component" className="text-xs">MyChat.tsx</TabsTrigger>
            <TabsTrigger value="apiRoute" className="text-xs">route.ts</TabsTrigger>
            <TabsTrigger value="envVars" className="text-xs">.env.local</TabsTrigger>
          </TabsList>

          <TabsContent value="component" className="flex-1 mt-3 overflow-auto">
            <div className="relative">
              <pre className="bg-muted/50 border text-foreground p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{files.component}</code>
              </pre>
              <Button
                size="sm"
                variant="default"
                onClick={() => handleCopy(files.component)}
                className="absolute top-3 right-3 h-7 text-xs"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="apiRoute" className="flex-1 mt-3 overflow-auto">
            <div className="relative">
              <pre className="bg-muted/50 border text-foreground p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{files.apiRoute}</code>
              </pre>
              <Button
                size="sm"
                variant="default"
                onClick={() => handleCopy(files.apiRoute)}
                className="absolute top-3 right-3 h-7 text-xs"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="envVars" className="flex-1 mt-3 overflow-auto">
            <div className="relative">
              <pre className="bg-muted/50 border text-foreground p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
                <code>{files.envVars}</code>
              </pre>
              <Button
                size="sm"
                variant="default"
                onClick={() => handleCopy(files.envVars)}
                className="absolute top-3 right-3 h-7 text-xs"
              >
                {copied ? "✓ Copied!" : "Copy"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
