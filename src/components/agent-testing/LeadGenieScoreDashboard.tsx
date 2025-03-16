import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  Search,
  ArrowLeft,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  useSalesContactFinder,
  SearchResult,
} from "@/api/hooks/useSalesContactFinder";
import LeadGenieScoreInfo from "./LeadGenieScoreInfo";
import { Link } from "react-router-dom";
import { LeadGenieScoreParams } from "@/api/proxy";
import MarkdownDisplay from "@/components/ui/markdown-display";

const LeadGenieScoreDashboard: React.FC = () => {
  const [company, setCompany] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [icpDescription, setIcpDescription] = useState("");
  const [formResponse, setFormResponse] = useState("");
  const [isResultExpanded, setIsResultExpanded] = useState(true);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const {
    isLoading,
    currentResult,
    searchHistory,
    checkHealth: manualHealthCheck,
    submitLeadGenieScore,
    loadHistoryItem,
  } = useSalesContactFinder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResultExpanded(true);

    const params: LeadGenieScoreParams = {
      company,
      product_name: productName,
      product_description: productDescription,
      icp_description: icpDescription,
      form_response: formResponse,
    };

    await submitLeadGenieScore(params);
  };

  const handleLoadHistoryItem = (item: SearchResult) => {
    loadHistoryItem(item);
    setIsResultExpanded(true);
  };

  const formatJson = (json: any) => {
    return JSON.stringify(json, null, 2);
  };

  const generateMarkdown = (result: any) => {
    if (!result) return "No data available";

    // If the result already contains raw markdown, return it
    if (result.raw_markdown) {
      // Clean up the markdown by removing markdown code block syntax
      let cleanMarkdown = result.raw_markdown;
      cleanMarkdown = cleanMarkdown.replace(/```markdown\n/g, "");
      cleanMarkdown = cleanMarkdown.replace(/```$/g, "");
      return cleanMarkdown;
    }

    // Otherwise generate markdown from structured data with proper markdown formatting
    let markdown = `# Lead Genie Score Results for ${currentResult?.company}\n\n`;
    markdown += `*Generated on: ${new Date(currentResult?.timestamp || "").toLocaleString()}*\n\n`;

    // Parse the lead score data
    if (result.lead_score) {
      markdown += `## Lead Score: ${result.lead_score}/10\n\n`;
    }

    if (result.use_case_summary) {
      markdown += `## Use Case Summary\n\n${result.use_case_summary}\n\n`;
    }

    if (result.talking_points && Array.isArray(result.talking_points)) {
      markdown += `## Recommended Talking Points\n\n`;
      result.talking_points.forEach((point: string, index: number) => {
        markdown += `${index + 1}. ${point}\n`;
      });
      markdown += `\n`;
    }

    // If no structured data was found, add a default message
    if (
      !result.lead_score &&
      !result.use_case_summary &&
      !result.talking_points
    ) {
      markdown += `## Lead Score Analysis\n\n`;
      markdown += `*No structured data available. Please see the raw JSON for details.*\n\n`;
    }

    return markdown;
  };

  const downloadMarkdown = () => {
    if (!currentResult?.result) return;

    const markdown = generateMarkdown(currentResult.result);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lead-score-${currentResult.company.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Link
            to="/agent-playground"
            className="text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">
            Lead Genie Score - AI Agent Testing
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">
            Test the lead scoring AI agent by inputting parameters and viewing
            results.
          </p>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Info" : "About Lead Genie Score"}
          </Button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-8">
          <LeadGenieScoreInfo />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lead Parameters</CardTitle>
            <CardDescription>
              Enter details to analyze and score the lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company Name
                </label>
                <Input
                  id="company"
                  placeholder="e.g. TechSolutions Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">
                  Your Product Name
                </label>
                <Input
                  id="productName"
                  placeholder="e.g. LeadGenie"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="productDescription"
                  className="text-sm font-medium"
                >
                  Product Description
                </label>
                <Textarea
                  id="productDescription"
                  placeholder="Describe your product or service..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="icpDescription" className="text-sm font-medium">
                  Ideal Customer Profile
                </label>
                <Textarea
                  id="icpDescription"
                  placeholder="Describe your ideal customer..."
                  value={icpDescription}
                  onChange={(e) => setIcpDescription(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="formResponse" className="text-sm font-medium">
                  Lead Form Response
                </label>
                <Textarea
                  id="formResponse"
                  placeholder="Paste the lead's form response or inquiry..."
                  value={formResponse}
                  onChange={(e) => setFormResponse(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Score Lead
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  onClick={manualHealthCheck}
                >
                  Check API Status
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  <p>API URL: https://13.233.233.139:8000</p>
                  <p>Using proxy to handle self-signed certificate</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          <Collapsible
            open={isResultExpanded}
            onOpenChange={setIsResultExpanded}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Results</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isResultExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="my-2" />

            <CollapsibleContent>
              {!currentResult ? (
                <Card className="mt-4 bg-muted/50">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No results yet. Use the form to analyze and score a lead.
                    </p>
                  </CardContent>
                </Card>
              ) : currentResult.status === "loading" ? (
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Processing your request
                      </h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Analyzing lead data for {currentResult.company}...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : currentResult.status === "error" ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {(currentResult.error || "An unknown error occurred")
                      .split("\n")
                      .map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i <
                            (currentResult.error || "").split("\n").length -
                              1 && <br />}
                        </React.Fragment>
                      ))}
                  </AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={handleSubmit}
                  >
                    Retry
                  </Button>
                </Alert>
              ) : (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Lead Score Results for {currentResult.company}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(currentResult.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Tabs defaultValue="formatted" className="flex-1">
                        <TabsList>
                          <TabsTrigger value="formatted">
                            Lead Analysis
                          </TabsTrigger>
                        </TabsList>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadMarkdown}
                          disabled={!currentResult?.result}
                          className="ml-2"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>

                        <TabsContent value="formatted">
                          <Card className="bg-white text-gray-900 overflow-hidden">
                            <CardContent className="p-4">
                              <MarkdownDisplay
                                content={
                                  currentResult.result
                                    ? generateMarkdown(currentResult.result)
                                    : "No results available"
                                }
                                maxHeight="400px"
                                className="p-4 markdown-content"
                              />
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* History Section */}
          <Collapsible
            open={isHistoryExpanded}
            onOpenChange={setIsHistoryExpanded}
            className="w-full"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search History</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isHistoryExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="my-2" />

            <CollapsibleContent>
              {searchHistory.length === 0 ? (
                <Card className="mt-4 bg-muted/50">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No search history yet. Previous searches will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <ScrollArea className="h-[300px] mt-4">
                  <div className="space-y-2">
                    {searchHistory.map((item) => (
                      <Card
                        key={item.id}
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${currentResult?.id === item.id ? "border-primary" : ""}`}
                        onClick={() => handleLoadHistoryItem(item)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.company}</h4>
                              <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                {item.product}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground">
                                {new Date(item.timestamp).toLocaleString()}
                              </span>
                              <div className="ml-2">
                                {item.status === "success" ? (
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                ) : item.status === "error" ? (
                                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default LeadGenieScoreDashboard;
