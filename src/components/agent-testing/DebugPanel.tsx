import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bug, X } from "lucide-react";

interface DebugPanelProps {
  data: any;
  title?: string;
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  data,
  title = "Debug Info",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-4 w-4 mr-2" />
        Show Debug Info
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[80vh] z-50 shadow-lg border-yellow-300">
      <CardHeader className="py-2 px-4 bg-yellow-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-yellow-800">
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[50vh]">
          <pre className="text-xs p-4 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DebugPanel;
