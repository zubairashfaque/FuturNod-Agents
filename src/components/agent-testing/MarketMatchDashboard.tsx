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
import {
  useSalesContactFinder,
  SearchResult,
} from "@/api/hooks/useSalesContactFinder";
import MarketMatchInfo from "./MarketMatchInfo";
import { Link } from "react-router-dom";
import MarkdownDisplay from "@/components/ui/markdown-display";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const MarketMatchDashboard: React.FC = () => {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [isResultExpanded, setIsResultExpanded] = useState(true);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const {
    isLoading,
    currentResult,
    searchHistory,
    checkHealth: manualHealthCheck,
    submitSearch,
    loadHistoryItem,
  } = useSalesContactFinder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResultExpanded(true);
    await submitSearch(company, product);
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

    try {
      // If the result already contains raw markdown, return it
      if (result.raw_markdown) {
        // Clean up the markdown by removing markdown code block syntax
        let cleanMarkdown = result.raw_markdown;
        cleanMarkdown = cleanMarkdown.replace(/```markdown\n/g, "");
        cleanMarkdown = cleanMarkdown.replace(/```$/g, "");
        return cleanMarkdown;
      }

      // If the result has file_output, use that
      if (result.file_output && typeof result.file_output === "string") {
        return result.file_output;
      }

      // Otherwise generate markdown from structured data with proper markdown formatting
      let markdown = `# Market Match Results for ${currentResult?.company}\n\n`;
      markdown += `*Generated on: ${new Date(currentResult?.timestamp || "").toLocaleString()}*\n\n`;

      markdown += `## Company Analysis\n\n`;
      if (result.company_analysis) {
        markdown += `**Strengths:** ${result.company_analysis.strengths || "N/A"}\n\n`;
        markdown += `**Weaknesses:** ${result.company_analysis.weaknesses || "N/A"}\n\n`;
        markdown += `**Opportunities:** ${result.company_analysis.opportunities || "N/A"}\n\n`;
        markdown += `**Threats:** ${result.company_analysis.threats || "N/A"}\n\n`;
      } else {
        markdown += `*No company analysis available.*\n\n`;
      }

      markdown += `## Similar Companies\n\n`;
      if (result.similar_companies && Array.isArray(result.similar_companies)) {
        result.similar_companies.forEach((company: any, index: number) => {
          markdown += `### Company ${index + 1}: ${company.name || "Unknown"}\n\n`;
          markdown += `**Industry:** ${company.industry || "N/A"}\n\n`;
          markdown += `**Similarity Score:** ${company.similarity_score ? Math.round(company.similarity_score * 100) : "N/A"}%\n\n`;
          markdown += `**Key Attributes:** ${company.key_attributes || "N/A"}\n\n`;
        });
      } else {
        markdown += `*No similar companies available.*\n\n`;
      }

      markdown += `## Outreach Strategy\n\n`;
      if (result.outreach_strategy) {
        markdown += `**Approach:** ${result.outreach_strategy.approach || "N/A"}\n\n`;
        markdown += `**Key Messaging:** ${result.outreach_strategy.key_messaging || "N/A"}\n\n`;
        markdown += `**Value Proposition:** ${result.outreach_strategy.value_proposition || "N/A"}\n\n`;
      } else {
        markdown += `*No outreach strategy available.*\n\n`;
      }

      return markdown || "No content available";
    } catch (error) {
      console.error("Error generating markdown:", error);
      return "Error generating markdown from result data. See raw JSON for details.";
    }
  };

  const downloadMarkdown = () => {
    if (!currentResult?.result) return;

    const markdown = generateMarkdown(currentResult.result);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `market-match-${currentResult.company.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.md`;
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
          <h1 className="text-3xl font-bold">MarketMatch - AI Agent Testing</h1>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">
            Test the market match AI agent by inputting parameters and viewing
            results.
          </p>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Info" : "About MarketMatch"}
          </Button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-8">
          <MarketMatchInfo />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
            <CardDescription>
              Enter details to find market matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Target Company
                </label>
                <Input
                  id="company"
                  placeholder="e.g. Adobe Inc"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="product" className="text-sm font-medium">
                  Product Description
                </label>
                <Textarea
                  id="product"
                  placeholder="Describe your product or service..."
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[100px]"
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
                      Find Matches
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
                    <p>No results yet. Use the form to find market matches.</p>
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
                        Analyzing market data for {currentResult.company}...
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
                      Market Match Results for {currentResult.company}
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
                            Market Analysis
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
                              <ErrorBoundary>
                                <div className="bg-white p-4 rounded-md border border-gray-200 overflow-auto">
                                  <div className="whitespace-pre-wrap">
                                    {currentResult.result
                                      ? generateMarkdown(currentResult.result)
                                      : "No results available"}
                                  </div>
                                </div>
                              </ErrorBoundary>
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

export default MarketMatchDashboard;
