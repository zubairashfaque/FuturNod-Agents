import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Rocket,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { useSalesContactFinder } from "@/api/hooks/useSalesContactFinder";
import DealCraftInfo from "./DealCraftInfo";
import DebugPanel from "./DebugPanel";
import MarkdownDisplay from "@/components/ui/markdown-display";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const DealCraftDashboard = () => {
  // Form state
  const [customerName, setCustomerName] = useState("TechCorp");
  const [customerIndustry, setCustomerIndustry] = useState("Technology");
  const [customerSize, setCustomerSize] = useState(
    "Mid-size (100-500 employees)",
  );
  const [customerChallenges, setCustomerChallenges] = useState(
    "Inefficient sales process and low conversion rates",
  );
  const [customerBudget, setCustomerBudget] = useState("10,000 - 25,000");

  const [companyName, setCompanyName] = useState("FutureNod");
  const [companyProducts, setCompanyProducts] = useState(
    "AI Sales Assistant, Lead Qualification Platform",
  );
  const [companyPricingModels, setCompanyPricingModels] = useState(
    "Monthly subscription, Annual contract with discount",
  );
  const [companyUSPs, setCompanyUSPs] = useState(
    "AI-powered personalization, Integration with CRM systems",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format the products, pricing models, and USPs as arrays
    const productsArray = companyProducts.split(",").map((item) => item.trim());
    const pricingModelsArray = companyPricingModels
      .split(",")
      .map((item) => item.trim());
    const uspsArray = companyUSPs.split(",").map((item) => item.trim());

    // Create the payload
    const payload = {
      target_company: "deal-craft", // This is a marker for the proxy to use the right endpoint
      our_product: JSON.stringify({
        customer_info: {
          name: customerName,
          industry: customerIndustry,
          size: customerSize,
          current_challenges: customerChallenges,
          budget_range: customerBudget,
        },
        company_info: {
          name: companyName,
          products: productsArray,
          pricing_models: pricingModelsArray,
          unique_selling_points: uspsArray,
        },
      }),
    };

    await submitSearch(payload.target_company, payload.our_product);
  };

  // Filter history to only show DealCraft items
  const filteredHistory = searchHistory.filter((item) => {
    try {
      return item.company === "deal-craft";
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
    a.download = `deal-craft-${customerName.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold">DealCraft</h1>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600">
            Create customized, persuasive sales proposals by analyzing
            requirements and crafting pricing strategies.
          </p>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Info" : "About DealCraft"}
          </Button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-8">
          <DealCraftInfo />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Input Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Customer Information</h3>
                  <Input
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <Input
                    placeholder="Industry"
                    value={customerIndustry}
                    onChange={(e) => setCustomerIndustry(e.target.value)}
                  />
                  <Input
                    placeholder="Company Size"
                    value={customerSize}
                    onChange={(e) => setCustomerSize(e.target.value)}
                  />
                  <Textarea
                    placeholder="Current Challenges"
                    value={customerChallenges}
                    onChange={(e) => setCustomerChallenges(e.target.value)}
                  />
                  <Input
                    placeholder="Budget Range"
                    value={customerBudget}
                    onChange={(e) => setCustomerBudget(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Company Information</h3>
                  <Input
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Products (comma separated)"
                    value={companyProducts}
                    onChange={(e) => setCompanyProducts(e.target.value)}
                  />
                  <Textarea
                    placeholder="Pricing Models (comma separated)"
                    value={companyPricingModels}
                    onChange={(e) => setCompanyPricingModels(e.target.value)}
                  />
                  <Textarea
                    placeholder="Unique Selling Points (comma separated)"
                    value={companyUSPs}
                    onChange={(e) => setCompanyUSPs(e.target.value)}
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
                      "Generate Sales Proposal"
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
                              {JSON.parse(item.product)?.customer_info?.name ||
                                "Unknown"}
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
              <CardTitle className="text-xl">Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500">Generating sales proposal...</p>
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
                        <TabsTrigger value="markdown">
                          Offer Content
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
                        Download Proposal
                      </Button>
                    </Tabs>
                  </div>
                  <TabsContent value="markdown" className="mt-0">
                    <ErrorBoundary>
                      <div className="bg-white p-4 rounded-md border border-gray-200 overflow-auto">
                        <div className="whitespace-pre-wrap">
                          {typeof currentResult.result?.raw_markdown ===
                          "string"
                            ? currentResult.result.raw_markdown
                            : typeof currentResult.result === "string"
                              ? currentResult.result
                              : "No content available"}
                        </div>
                      </div>
                    </ErrorBoundary>
                  </TabsContent>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Rocket className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No Proposal Generated Yet
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Fill out the form and click "Generate Sales Proposal" to
                    create a customized sales proposal for your customer.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {debugData && (
        <DebugPanel data={debugData} title="DealCraft Debug Info" />
      )}
    </div>
  );
};

export default DealCraftDashboard;
