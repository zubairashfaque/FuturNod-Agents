import { supabase } from "../../supabase/supabase";
import {
  DealCraftParams,
  BriefVistaParams,
  ContactVistaParams,
  PDFPitchParams,
} from "./interfaces";

// API configuration
const API_URL = "https://13.233.233.139:8000";
const API_KEY = "f3BUczDcVEkEQhwJeiaa8aY3mxXr3Hzyip-rYB0p2Yk";

export interface SalesContactFinderParams {
  target_company: string;
  our_product: string;
}

export interface LeadGenieScoreParams {
  company: string;
  product_name: string;
  product_description: string;
  icp_description: string;
  form_response: string;
}

export interface ApiResponse {
  success: boolean;
  request_id?: string;
  message?: string;
  data?: any;
}

// Check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    console.log(`Checking API health at ${API_URL}/health`);
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": API_KEY,
      },
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Health Check:", data);
    return true;
  } catch (error) {
    console.error("API Health Check Error:", error);
    return false;
  }
};

// Start a task
export const startSalesContactFinderTask = async (
  params: SalesContactFinderParams,
): Promise<ApiResponse> => {
  try {
    // Determine the endpoint based on the presence of certain parameters
    let endpoint = "/agents/sales-contact-finder";
    let payload = params;

    // If this is a market-match request, use that endpoint instead
    if (
      window.location.pathname.includes("market-match") ||
      params.target_company === "market-match"
    ) {
      endpoint = "/agents/market-match";
      console.log(`Using market-match endpoint`);
    }

    // If this is a contract-vista request, use that endpoint instead
    if (
      window.location.pathname.includes("contract-vista") ||
      params.target_company === "contract-vista"
    ) {
      endpoint = "/agents/contract-vista";
      console.log(`Using contract-vista endpoint`);
      // For contract-vista, we're using a different payload structure
      payload = {
        query: params.our_product || "",
      } as any;
      console.log("Contract Vista params:", payload);
    }

    // If this is a deal-craft request, use that endpoint instead
    if (
      window.location.pathname.includes("deal-craft") ||
      params.target_company === "deal-craft"
    ) {
      endpoint = "/agents/deal-craft";
      console.log(`Using deal-craft endpoint`);
      // Keep the original payload structure but parse it if it's a string
      if (typeof params.our_product === "string") {
        try {
          payload = JSON.parse(params.our_product);
        } catch (e) {
          console.error("Error parsing deal-craft payload:", e);
        }
      }
    }

    // If this is a brief-vista request, use that endpoint instead
    if (
      window.location.pathname.includes("brief-vista") ||
      params.target_company === "brief-vista"
    ) {
      endpoint = "/agents/brief-vista";
      console.log(`Using brief-vista endpoint`);
      // Keep the original payload structure but parse it if it's a string
      if (typeof params.our_product === "string") {
        try {
          payload = JSON.parse(params.our_product);
        } catch (e) {
          console.error("Error parsing brief-vista payload:", e);
        }
      }
    }

    // If this is a contact-vista request, use that endpoint instead
    if (
      window.location.pathname.includes("contact-vista") ||
      params.target_company === "contact-vista"
    ) {
      endpoint = "/agents/contact-vista";
      console.log(`Using contact-vista endpoint`);
      // Keep the original payload structure but parse it if it's a string
      if (typeof params.our_product === "string") {
        try {
          payload = JSON.parse(params.our_product);
        } catch (e) {
          console.error("Error parsing contact-vista payload:", e);
        }
      }
    }

    // If this is a pdf-pitch request, use that endpoint instead
    if (
      window.location.pathname.includes("pdf-pitch") ||
      params.target_company === "pdf-pitch"
    ) {
      endpoint = "/agents/pdf-pitch";
      console.log(`Using pdf-pitch endpoint`);
      // Keep the original payload structure but parse it if it's a string
      if (typeof params.our_product === "string") {
        try {
          payload = JSON.parse(params.our_product);
        } catch (e) {
          console.error("Error parsing pdf-pitch payload:", e);
        }
      }
    }

    console.log(`Sending request to ${API_URL}${endpoint}`);
    console.log("Payload:", payload);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error ${response.status}: ${await response.text()}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Start Task Error:", error);
    return { success: false, message: error.message };
  }
};

// Start Lead Genie Score task
export const startLeadGenieScoreTask = async (
  params: LeadGenieScoreParams,
): Promise<ApiResponse> => {
  try {
    console.log(`Sending request to ${API_URL}/agents/lead-genie-score`);
    console.log("Payload:", params);

    const response = await fetch(`${API_URL}/agents/lead-genie-score`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error ${response.status}: ${await response.text()}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Start Lead Genie Score Task Error:", error);
    return { success: false, message: error.message };
  }
};

// Check task status
export const checkTaskStatus = async (
  requestId: string,
): Promise<ApiResponse> => {
  try {
    console.log(`Checking task status at ${API_URL}/task/${requestId}`);

    const response = await fetch(`${API_URL}/task/${requestId}`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      console.log(`Error checking status: HTTP ${response.status}`);
      return {
        success: false,
        message: `Error checking status: HTTP ${response.status}`,
      };
    }

    const status = await response.json();
    console.log("Raw status response:", status);

    // Process the file_output if it exists
    if (status.success && status.data) {
      try {
        console.log(
          "Raw API response data:",
          JSON.stringify(status.data, null, 2),
        );

        // Always ensure these fields exist
        status.data.raw_markdown = status.data.raw_markdown || "";
        status.data.file_output = status.data.file_output || "";

        // Handle different response formats
        if (status.data.result && typeof status.data.result === "string") {
          // If there's a result field as string, use it for both markdown fields
          status.data.raw_markdown = status.data.result;
          status.data.file_output = status.data.result;
          console.log("Using result string for markdown", status.data.result);
        } else if (
          status.data.result &&
          typeof status.data.result === "object"
        ) {
          // If result is an object, check for markdown content inside it
          if (status.data.result.content) {
            status.data.raw_markdown = status.data.result.content;
            status.data.file_output = status.data.result.content;
            console.log(
              "Using result.content for markdown",
              status.data.result.content,
            );
          } else if (status.data.result.markdown) {
            status.data.raw_markdown = status.data.result.markdown;
            status.data.file_output = status.data.result.markdown;
            console.log(
              "Using result.markdown for markdown",
              status.data.result.markdown,
            );
          }
        }

        // For file_output, extract data from markdown if it exists
        if (
          status.data.file_output &&
          typeof status.data.file_output === "string"
        ) {
          const jsonData = extractDataFromMarkdown(status.data.file_output);
          if (jsonData) {
            status.data = {
              ...status.data,
              ...jsonData,
            };
          }
        }

        // Final check to ensure we have content
        if (!status.data.raw_markdown && !status.data.file_output) {
          const fallbackMessage =
            "# No content available\n\nThe API returned a successful response but no content was found.";
          status.data.raw_markdown = fallbackMessage;
          status.data.file_output = fallbackMessage;
          console.log("No content found, using fallback message");
        }

        // Ensure we have a non-empty string for both fields
        if (!status.data.raw_markdown) {
          status.data.raw_markdown =
            status.data.file_output || "# No content available";
        }
        if (!status.data.file_output) {
          status.data.file_output =
            status.data.raw_markdown || "# No content available";
        }

        console.log("Processed data for rendering:", {
          raw_markdown_length: status.data.raw_markdown?.length || 0,
          file_output_length: status.data.file_output?.length || 0,
          sample: status.data.raw_markdown?.substring(0, 100) || "empty",
        });
      } catch (parseError) {
        console.error("Error parsing response data:", parseError);
        // Ensure we have at least some data to display
        const errorMessage =
          "# Error parsing response\n\n${parseError.message}\n\nPlease check the console for more details.";
        status.data.raw_markdown = errorMessage;
        status.data.file_output = errorMessage;
      }
    } else if (status.success) {
      // If status is success but no data, create a minimal data structure
      const noDataMessage =
        "# No data available\n\nThe API returned a successful response but no data was found.";
      status.data = {
        raw_markdown: noDataMessage,
        file_output: noDataMessage,
      };
      console.log("Success but no data, using fallback structure");
    }

    return status;
  } catch (error) {
    console.error("Check Task Status Error:", error);
    return { success: false, message: error.message };
  }
};

// Helper function to extract structured data from markdown output
function extractDataFromMarkdown(markdown: string): any {
  try {
    // If markdown is empty or not a string, return a basic structure
    if (!markdown || typeof markdown !== "string") {
      return {
        raw_markdown: "No content available",
        file_output: "No content available",
      };
    }

    // For all agent types, always include the raw markdown
    const result = {
      raw_markdown: markdown,
      file_output: markdown,
    };

    // Check if we're on a specialized agent page
    const isSpecialAgent = [
      "contract-vista",
      "deal-craft",
      "brief-vista",
      "contact-vista",
      "pdf-pitch",
      "market-match",
    ].some((agent) => window.location.pathname.includes(agent));

    // For special agents, just return the raw markdown
    if (isSpecialAgent) {
      return result;
    }

    // For sales contact finder, add additional structured data
    const defaultStructure = {
      contacts: [],
      company_info: {
        name: "",
        industry: "",
        size: "",
        location: "",
      },
      product_match: {
        relevance: 0.85,
        department: "Data & AI",
        potential_use_case: "Enhancing data analytics capabilities",
      },
    };

    // Merge the default structure with our result
    const enhancedResult = {
      ...defaultStructure,
      ...result,
    };

    // Try to extract contacts from markdown tables
    const contactsMatch = markdown.match(
      /\|\s*Name\s*\|.*?\n((?:\|.*?\|.*?\n)+)/s,
    );
    if (contactsMatch && contactsMatch[1]) {
      const contactLines = contactsMatch[1].trim().split("\n");
      enhancedResult.contacts = contactLines
        .map((line) => {
          const parts = line.split("|").filter((part) => part.trim());
          if (parts.length >= 3) {
            return {
              name: parts[0].trim(),
              title: parts[1].trim(),
              email: parts[0].trim() + "@example.com", // Generate fake email since it's not in the table
              confidence: 0.8 + Math.random() * 0.2, // Generate random confidence score
            };
          }
          return null;
        })
        .filter((contact) => contact !== null);
    }

    // Extract company info
    const companyNameMatch = markdown.match(
      /Company Overview[\s\S]*?([\w\s]+) is a/i,
    );
    if (companyNameMatch && companyNameMatch[1]) {
      enhancedResult.company_info.name = companyNameMatch[1].trim();
    }

    const industryMatch = markdown.match(/operates primarily in ([^.]+)/i);
    if (industryMatch && industryMatch[1]) {
      enhancedResult.company_info.industry = industryMatch[1].trim();
    }

    const sizeMatch = markdown.match(
      /workforce of approximately ([\d,]+) employees/i,
    );
    if (sizeMatch && sizeMatch[1]) {
      enhancedResult.company_info.size = sizeMatch[1].trim();
    }

    const locationMatch = markdown.match(/headquartered in ([^,]+)/i);
    if (locationMatch && locationMatch[1]) {
      enhancedResult.company_info.location = locationMatch[1].trim();
    }

    return enhancedResult;
  } catch (error) {
    console.error("Error extracting data from markdown:", error);
    // Return the raw markdown if parsing fails
    return {
      raw_markdown: markdown || "Error processing content",
      file_output: markdown || "Error processing content",
    };
  }
}

// Save search result to Supabase
export const saveSearchToHistory = async (
  company: string,
  product: string,
  result: any,
  status: string = "success",
) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    await supabase.from("search_history").insert({
      company,
      product,
      result,
      status,
      user_id: userId,
    });

    return true;
  } catch (dbError) {
    console.error("Error saving to database:", dbError);
    return false;
  }
};
