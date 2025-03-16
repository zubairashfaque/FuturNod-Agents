import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  X,
  Download,
} from "lucide-react";
import BriefVistaInfo from "./BriefVistaInfo";
import DebugPanel from "./DebugPanel";
import { useSalesContactFinder } from "@/api/hooks/useSalesContactFinder";
import MarkdownDisplay from "@/components/ui/markdown-display";

const BriefVistaDashboard = () => {
  // Form state
  const [participants, setParticipants] = useState<string[]>([
    "John Doe john.doe@example.com",
    "Jane Smith jane.smith@example.com",
  ]);
  const [newParticipant, setNewParticipant] = useState("");
  const [company, setCompany] = useState("TechCorp");
  const [context, setContext] = useState(
    "Initial discovery call to understand their needs and pain points",
  );
  const [objective, setObjective] = useState(
    "Identify key requirements and establish next steps for a potential partnership",
  );
  const [priorInteractions, setPriorInteractions] = useState(
    "Brief email exchange where they expressed interest in our AI solutions",
  );

  const [showInfo, setShowInfo] = useState(false);

  // API integration
  const {
    isLoading,
    currentResult,
    searchHistory,
    checkHealth,
    submitSearch,
    loadHistoryItem,
  } = useSalesContactFinder();

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the payload
    const payload = {
      target_company: "brief-vista", // This is a marker for the proxy to use the right endpoint
      our_product: JSON.stringify({
        participants,
        company,
        context,
        objective,
        prior_interactions: priorInteractions,
      }),
    };

    await submitSearch(payload.target_company, payload.our_product);
  };

  // Filter history to only show BriefVista items
  const filteredHistory = searchHistory.filter((item) => {
    try {
      return item.company === "brief-vista";
    } catch {
      return false;
    }
  });

  // Debug state
  const [debugData, setDebugData] = useState<any>(null);

  // Update debug data when currentResult changes
  useEffect(() => {
    if (currentResult?.result) {
      setDebugData({
        resultType: typeof currentResult.result,
        hasRawMarkdown: !!currentResult.result?.raw_markdown,
        hasFileOutput: !!currentResult.result?.file_output,
        rawMarkdownType: typeof currentResult.result?.raw_markdown,
        fileOutputType: typeof currentResult.result?.file_output,
        rawMarkdownSample:
          currentResult.result?.raw_markdown?.substring(0, 100) || "none",
        fileOutputSample:
          currentResult.result?.file_output?.substring(0, 100) || "none",
        resultKeys: Object.keys(currentResult.result || {}),
        fullResult: currentResult.result,
      });
    }
  }, [currentResult]);

  const downloadMarkdown = () => {
    if (!currentResult?.result) return;

    const markdown =
      currentResult.result?.raw_markdown || "No content available";
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meeting-brief-${company.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold">BriefVista</h1>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600">
            AI-powered meeting preparation system that researches participants,
            analyzes industry trends, and creates strategic approaches.
          </p>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Info" : "About BriefVista"}
          </Button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-8">
          <BriefVistaInfo />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Meeting Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Participants</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Name and email"
                      value={newParticipant}
                      onChange={(e) => setNewParticipant(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddParticipant}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {participants.map((participant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                      >
                        <span className="text-sm truncate">{participant}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleRemoveParticipant(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Company</h3>
                  <Input
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Meeting Context</h3>
                  <Textarea
                    placeholder="Context of the meeting"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Meeting Objective</h3>
                  <Textarea
                    placeholder="What you want to achieve"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Prior Interactions</h3>
                  <Textarea
                    placeholder="Previous communications"
                    value={priorInteractions}
                    onChange={(e) => setPriorInteractions(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Generate Meeting Brief"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Search History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {filteredHistory.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No search history yet
                    </p>
                  ) : (
                    filteredHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 text-sm border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => loadHistoryItem(item)}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">
                              {JSON.parse(item.product)?.company || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {item.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Meeting Brief</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500">Generating meeting brief...</p>
                  <p className="text-xs text-gray-400 mt-2">
                    This may take up to 1-2 minutes
                  </p>
                </div>
              ) : currentResult?.status === "error" ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-red-800 font-medium mb-2">Error</h3>
                  <p className="text-red-600 text-sm whitespace-pre-wrap">
                    {currentResult.error}
                  </p>
                </div>
              ) : currentResult?.status === "success" ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Tabs defaultValue="markdown" className="flex-1">
                      <TabsList>
                        <TabsTrigger value="markdown">Meeting Prep</TabsTrigger>
                      </TabsList>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadMarkdown}
                        disabled={!currentResult?.result}
                        className="ml-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Brief
                      </Button>
                    </Tabs>
                  </div>
                  <TabsContent value="markdown" className="mt-0">
                    <MarkdownDisplay
                      content={
                        typeof currentResult.result?.raw_markdown === "string"
                          ? currentResult.result.raw_markdown
                          : "No content available"
                      }
                      maxHeight="600px"
                      className="markdown-content"
                    />
                  </TabsContent>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No Meeting Brief Generated Yet
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Fill out the form with meeting details and click "Generate
                    Meeting Brief" to create a comprehensive preparation
                    document.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {debugData && (
        <DebugPanel data={debugData} title="BriefVista Debug Info" />
      )}
    </div>
  );
};

export default BriefVistaDashboard;
