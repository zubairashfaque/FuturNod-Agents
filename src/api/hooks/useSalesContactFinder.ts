import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  checkApiHealth,
  startSalesContactFinderTask,
  startLeadGenieScoreTask,
  checkTaskStatus,
  saveSearchToHistory,
  SalesContactFinderParams,
  LeadGenieScoreParams,
} from "../proxy";

export interface SearchResult {
  id: string;
  timestamp: string;
  company: string;
  product: string;
  status: "success" | "error" | "loading";
  result?: any;
  error?: string;
}

export const useSalesContactFinder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const { toast } = useToast();

  // Check API health
  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    const isHealthy = await checkApiHealth();
    setIsLoading(false);

    if (isHealthy) {
      toast({
        title: "API Service Available",
        description: "The AI service is currently online and ready to use.",
      });
    } else {
      toast({
        title: "API Service Unavailable",
        description:
          "The AI service is currently unavailable. Please try again later. This may be due to SSL certificate issues with the API server.",
        variant: "destructive",
      });

      // Display more detailed troubleshooting information
      console.log("API Connection Troubleshooting:");
      console.log(`- API URL: https://13.233.233.139:8000`);
      console.log("- Using mode: 'cors' to handle CORS and certificate issues");
      console.log(
        "- Using credentials: 'omit' to avoid sending cookies with cross-origin requests",
      );
      console.log(
        "- Check browser console for more detailed error information",
      );
    }

    return isHealthy;
  }, [toast]);

  // Handle errors
  const handleError = useCallback(
    (search: SearchResult, error: any) => {
      console.error("API Error:", error);

      // Create a more informative error message
      let errorMessage = error.message || "An unknown error occurred";

      // Add specific guidance for common errors
      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError") ||
        errorMessage.includes("certificate")
      ) {
        errorMessage +=
          "\n\nThis may be due to SSL certificate issues with the API server. The server is using a self-signed certificate which browsers typically block.";
      }

      const errorSearch: SearchResult = {
        ...search,
        status: "error",
        error: errorMessage,
      };

      setCurrentResult(errorSearch);
      setSearchHistory((prev) => [errorSearch, ...prev]);
      setIsLoading(false);

      toast({
        title: "Error",
        description: errorMessage.split("\n")[0], // Show just the first line in the toast
        variant: "destructive",
      });

      // Save error to history
      saveSearchToHistory(search.company, search.product, null, "error");
    },
    [toast],
  );

  // Submit search
  const submitSearch = useCallback(
    async (company: string, product: string) => {
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
      const isApiHealthy = await checkHealth();
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

      try {
        // Start the task
        const result = await startSalesContactFinderTask({
          target_company: company,
          our_product: product,
        });

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
            const status = await checkTaskStatus(requestId);
            console.log("Task status response:", status);

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
            console.log("Task completed with data:", status.data);

            // Update the current result and add to history
            const completedSearch: SearchResult = {
              ...newSearch,
              status: "success",
              result: status.data,
            };

            console.log("Completed search with data:", {
              id: completedSearch.id,
              company: completedSearch.company,
              status: completedSearch.status,
              resultKeys: status.data ? Object.keys(status.data) : [],
              hasRawMarkdown: !!status.data?.raw_markdown,
              hasFileOutput: !!status.data?.file_output,
              rawMarkdownSample:
                status.data?.raw_markdown?.substring(0, 100) || "none",
              fileOutputSample:
                status.data?.file_output?.substring(0, 100) || "none",
            });
            setCurrentResult(completedSearch);
            setSearchHistory((prev) => [completedSearch, ...prev]);
            setIsLoading(false);

            // Save to Supabase
            saveSearchToHistory(company, product, status.data, "success");
          } catch (pollError) {
            console.error("Polling error:", pollError);
            clearInterval(pollInterval);
            handleError(newSearch, pollError);
          }
        }, 5000); // Poll every 5 seconds (reduced from 10 seconds)
      } catch (error) {
        handleError(newSearch, error);
      }
    },
    [checkHealth, handleError, toast],
  );

  // Submit Lead Genie Score search
  const submitLeadGenieScore = useCallback(
    async (params: LeadGenieScoreParams) => {
      if (!params.company.trim() || !params.product_description.trim()) {
        toast({
          title: "Missing information",
          description:
            "Please provide both company name and product description.",
          variant: "destructive",
        });
        return;
      }

      // Check API health first
      const isApiHealthy = await checkHealth();
      if (!isApiHealthy) {
        return;
      }

      // Create a new search result entry
      const searchId = Date.now().toString();
      const newSearch: SearchResult = {
        id: searchId,
        timestamp: new Date().toISOString(),
        company: params.company,
        product: params.product_description,
        status: "loading",
      };

      setCurrentResult(newSearch);
      setIsLoading(true);

      try {
        // Start the task
        const result = await startLeadGenieScoreTask(params);

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
            const status = await checkTaskStatus(requestId);
            console.log("Task status response:", status);

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
            console.log("Task completed with data:", status.data);

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
            saveSearchToHistory(
              params.company,
              params.product_description,
              status.data,
              "success",
            );
          } catch (pollError) {
            console.error("Polling error:", pollError);
            clearInterval(pollInterval);
            handleError(newSearch, pollError);
          }
        }, 5000); // Poll every 5 seconds
      } catch (error) {
        handleError(newSearch, error);
      }
    },
    [checkHealth, handleError, toast],
  );

  // Load a history item
  const loadHistoryItem = useCallback((item: SearchResult) => {
    setCurrentResult(item);
  }, []);

  return {
    isLoading,
    currentResult,
    searchHistory,
    checkHealth,
    submitSearch,
    submitLeadGenieScore,
    loadHistoryItem,
  };
};
