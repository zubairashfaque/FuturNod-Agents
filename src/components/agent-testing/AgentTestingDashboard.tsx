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
import { useToast } from "@/components/ui/use-toast";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../../supabase/supabase";

interface SearchResult {
  id: string;
  timestamp: string;
  company: string;
  product: string;
  status: "success" | "error" | "loading";
  result?: any;
  error?: string;
}

const AgentTestingDashboard: React.FC = () => {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [isResultExpanded, setIsResultExpanded] = useState(true);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const { toast } = useToast();

  // API configuration
  const API_URL = "http://13.233.233.139:8080";
  const API_KEY = "f3BUczDcVEkEQhwJeiaa8aY3mxXr3Hzyip-rYB0p2Yk";

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Health Check:", data);
      return true;
    } catch (error) {
      console.error("API Health Check Error:", error);
      toast({
        title: "API Service Unavailable",
        description:
          "The AI service is currently unavailable. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company.trim() || !product.trim()) {
      toast({
        title: "Missing information",
        description:
          "Please provide both company name and product description.",
        variant: "destructive",
      });
      return;
    }

    // Check API health first
    const isApiHealthy = await checkApiHealth();
    if (!isApiHealthy) {
      return;
    }

    // Create a new search result entry
    const searchId = Date.now().toString();
    const newSearch: SearchResult = {
      id: searchId,
      timestamp: new Date().toISOString(),
      company,
      product,
      status: "loading",
    };

    setCurrentResult(newSearch);
    setIsLoading(true);
    setIsResultExpanded(true);

    try {
      // Make the POST request to start the task
      const headers = {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      };

      const payload = {
        target_company: company,
        our_product: product,
      };

      // Start the task
      const response = await fetch(`${API_URL}/agents/sales-contact-finder`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${await response.text()}`,
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Unknown error occurred");
      }

      const requestId = result.request_id;

      // Poll for results
      let maxAttempts = 30;
      let attempt = 0;

      const pollInterval = setInterval(async () => {
        attempt++;

        if (attempt > maxAttempts) {
          clearInterval(pollInterval);
          throw new Error(
            "Maximum polling attempts reached. Task may still be processing.",
          );
        }

        try {
          const statusResponse = await fetch(`${API_URL}/task/${requestId}`, {
            method: "GET",
            headers: headers,
          });

          if (!statusResponse.ok) {
            console.log(`Error checking status: HTTP ${statusResponse.status}`);
            return; // Continue polling
          }

          const status = await statusResponse.json();

          if (!status.success) {
            if (status.message && status.message.includes("not found")) {
              console.log("Task might still be initializing. Waiting...");
              return; // Continue polling
            } else {
              clearInterval(pollInterval);
              throw new Error(status.message || "Unknown error occurred");
            }
          }

          if (status.data?.task_status === "processing") {
            console.log("Task still processing. Waiting...");
            return; // Continue polling
          }

          // Task completed
          clearInterval(pollInterval);

          // Update the current result and add to history
          const completedSearch: SearchResult = {
            ...newSearch,
            status: "success",
            result: status.data,
          };

          setCurrentResult(completedSearch);
          setSearchHistory((prev) => [completedSearch, ...prev]);
          setIsLoading(false);

          // Save to Supabase
          try {
            await supabase.from("search_history").insert({
              company: company,
              product: product,
              result: status.data,
              status: "success",
              user_id: supabase.auth
                .getUser()
                .then(({ data }) => data.user?.id),
            });
          } catch (dbError) {
            console.error("Error saving to database:", dbError);
          }
        } catch (pollError) {
          clearInterval(pollInterval);
          handleError(newSearch, pollError);
        }
      }, 10000); // Poll every 10 seconds
    } catch (error) {
      handleError(newSearch, error);
    }
  };

  // Add a manual health check function
  const manualHealthCheck = async () => {
    setIsLoading(true);
    const isHealthy = await checkApiHealth();
    setIsLoading(false);

    if (isHealthy) {
      toast({
        title: "API Service Available",
        description: "The AI service is currently online and ready to use.",
      });
    }
  };

  const handleError = (search: SearchResult, error: any) => {
    const errorSearch: SearchResult = {
      ...search,
      status: "error",
      error: error.message || "An unknown error occurred",
    };

    setCurrentResult(errorSearch);
    setSearchHistory((prev) => [errorSearch, ...prev]);
    setIsLoading(false);

    toast({
      title: "Error",
      description: errorSearch.error,
      variant: "destructive",
    });
  };

  const loadHistoryItem = (item: SearchResult) => {
    setCurrentResult(item);
    setIsResultExpanded(true);
  };

  const formatJson = (json: any) => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Agent Testing Dashboard</h1>
        <p className="text-gray-500">
          Test the sales contact finder AI agent by inputting parameters and
          viewing results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
            <CardDescription>
              Enter details to find sales contacts
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
                  placeholder="e.g. Acme Corporation"
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
                      Find Contacts
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
                    <p>
                      No search results yet. Use the form to find sales
                      contacts.
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
                        Searching for contacts at {currentResult.company} for
                        your product...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : currentResult.status === "error" ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {currentResult.error || "An unknown error occurred"}
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
                      Results for {currentResult.company}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(currentResult.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="formatted">
                      <TabsList className="mb-4">
                        <TabsTrigger value="formatted">Formatted</TabsTrigger>
                        <TabsTrigger value="raw">Raw JSON</TabsTrigger>
                      </TabsList>

                      <TabsContent value="formatted">
                        {currentResult.result && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-3">
                                Recommended Contacts
                              </h3>
                              <div className="grid gap-4 md:grid-cols-2">
                                {currentResult.result.contacts.map(
                                  (contact: any, index: number) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <Card>
                                        <CardContent className="p-4">
                                          <div className="font-medium">
                                            {contact.name}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {contact.title}
                                          </div>
                                          <div className="text-sm mt-1">
                                            {contact.email}
                                          </div>
                                          <div className="mt-2 flex items-center">
                                            <div className="text-xs">
                                              Confidence:
                                            </div>
                                            <div className="ml-2 h-2 w-full bg-gray-200 rounded-full">
                                              <div
                                                className="h-2 bg-primary rounded-full"
                                                style={{
                                                  width: `${contact.confidence * 100}%`,
                                                }}
                                              ></div>
                                            </div>
                                            <div className="ml-2 text-xs">
                                              {Math.round(
                                                contact.confidence * 100,
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </motion.div>
                                  ),
                                )}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-3">
                                Company Information
                              </h3>
                              <Card>
                                <CardContent className="p-4">
                                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <dt className="text-sm font-medium">
                                      Name:
                                    </dt>
                                    <dd className="text-sm">
                                      {currentResult.result.company_info.name}
                                    </dd>

                                    <dt className="text-sm font-medium">
                                      Industry:
                                    </dt>
                                    <dd className="text-sm">
                                      {
                                        currentResult.result.company_info
                                          .industry
                                      }
                                    </dd>

                                    <dt className="text-sm font-medium">
                                      Size:
                                    </dt>
                                    <dd className="text-sm">
                                      {currentResult.result.company_info.size}
                                    </dd>

                                    <dt className="text-sm font-medium">
                                      Location:
                                    </dt>
                                    <dd className="text-sm">
                                      {
                                        currentResult.result.company_info
                                          .location
                                      }
                                    </dd>
                                  </dl>
                                </CardContent>
                              </Card>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-3">
                                Product Match Analysis
                              </h3>
                              <Card>
                                <CardContent className="p-4">
                                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <dt className="text-sm font-medium">
                                      Relevance:
                                    </dt>
                                    <dd className="text-sm">
                                      {Math.round(
                                        currentResult.result.product_match
                                          .relevance * 100,
                                      )}
                                      %
                                    </dd>

                                    <dt className="text-sm font-medium">
                                      Target Department:
                                    </dt>
                                    <dd className="text-sm">
                                      {
                                        currentResult.result.product_match
                                          .department
                                      }
                                    </dd>

                                    <dt className="text-sm font-medium">
                                      Potential Use Case:
                                    </dt>
                                    <dd className="text-sm">
                                      {
                                        currentResult.result.product_match
                                          .potential_use_case
                                      }
                                    </dd>
                                  </dl>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="raw">
                        <Card className="bg-gray-950 text-gray-50 font-mono text-sm overflow-hidden">
                          <CardContent className="p-4">
                            <ScrollArea className="h-[400px] w-full">
                              <pre>{formatJson(currentResult.result)}</pre>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
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
                        onClick={() => loadHistoryItem(item)}
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

export default AgentTestingDashboard;
