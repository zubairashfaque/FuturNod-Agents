import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileUp,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  ArrowLeft,
} from "lucide-react";
import PDFPitchInfo from "./PDFPitchInfo";
import { useSalesContactFinder } from "@/api/hooks/useSalesContactFinder";
import { Link } from "react-router-dom";
import MarkdownDisplay from "@/components/ui/markdown-display";

const PDFPitchDashboard = () => {
  // Form state for company info
  const [companyName, setCompanyName] = useState("TechInnovate");
  const [productName, setProductName] = useState("AI Analytics Suite");
  const [website, setWebsite] = useState("https://techinnovate.com");
  const [salesRepName, setSalesRepName] = useState("Alex Johnson");
  const [salesRepContact, setSalesRepContact] = useState(
    "alex.johnson@techinnovate.com",
  );

  // Form state for lead info
  const [leadName, setLeadName] = useState("Sarah Williams");
  const [leadCompany, setLeadCompany] = useState("DataDriven Inc.");
  const [leadIndustry, setLeadIndustry] = useState("Financial Services");

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

    // Create the payload
    const payload = {
      target_company: "pdf-pitch", // This is a marker for the proxy to use the right endpoint
      our_product: JSON.stringify({
        company_info: {
          name: companyName,
          product_name: productName,
          website,
          sales_rep_name: salesRepName,
          sales_rep_contact: salesRepContact,
        },
        lead_info: {
          name: leadName,
          company: leadCompany,
          industry: leadIndustry,
        },
      }),
    };

    await submitSearch(payload.target_company, payload.our_product);
  };

  // Filter history to only show PDFPitch items
  const filteredHistory = searchHistory.filter((item) => {
    try {
      return item.company === "pdf-pitch";
    } catch {
      return false;
    }
  });

  const downloadMarkdown = () => {
    if (!currentResult?.result) return;

    const markdown =
      currentResult.result?.file_output ||
      currentResult.result?.raw_markdown ||
      "No content available";
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pdf-pitch-${leadCompany.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Link
            to="/agent-playground"
            className="text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">PDFPitch</h1>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600">
            One-page sales pitch creator that researches leads, analyzes product
            alignment, and creates concise sales PDFs.
          </p>
          <Button variant="outline" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "Hide Info" : "About PDFPitch"}
          </Button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-8">
          <PDFPitchInfo />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Pitch Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">
                    Your Company Information
                  </h3>
                  <Input
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <Input
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Input
                    placeholder="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <Input
                    placeholder="Sales Rep Name"
                    value={salesRepName}
                    onChange={(e) => setSalesRepName(e.target.value)}
                  />
                  <Input
                    placeholder="Sales Rep Contact"
                    value={salesRepContact}
                    onChange={(e) => setSalesRepContact(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Lead Information</h3>
                  <Input
                    placeholder="Lead Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                  <Input
                    placeholder="Lead Company"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                  />
                  <Input
                    placeholder="Lead Industry"
                    value={leadIndustry}
                    onChange={(e) => setLeadIndustry(e.target.value)}
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
                      "Generate One-Page Pitch"
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
                              {JSON.parse(item.product)?.lead_info?.company ||
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
              <CardTitle className="text-xl">One-Page Pitch</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500">Generating one-page pitch...</p>
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
                <Tabs defaultValue="markdown">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList className="mb-0">
                      <TabsTrigger value="markdown">Pitch</TabsTrigger>
                    </TabsList>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadMarkdown}
                      disabled={!currentResult?.result}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Pitch
                    </Button>
                  </div>
                  <TabsContent value="markdown" className="mt-0">
                    <MarkdownDisplay
                      content={
                        currentResult.result?.file_output ||
                        currentResult.result?.raw_markdown ||
                        "No content available"
                      }
                      maxHeight="600px"
                      className="markdown-content"
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileUp className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No Pitch Generated Yet
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Fill out the form and click "Generate One-Page Pitch" to
                    create a concise, professionally designed sales pitch PDF.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDFPitchDashboard;
