export interface DealCraftParams {
  customer_info: {
    name: string;
    industry: string;
    size: string;
    current_challenges: string;
    budget_range: string;
  };
  company_info: {
    name: string;
    products: string[];
    pricing_models: string[];
    unique_selling_points: string[];
  };
}

export interface BriefVistaParams {
  participants: string[];
  company: string;
  context: string;
  objective: string;
  prior_interactions: string;
}

export interface ContactVistaParams {
  name: string;
  title: string;
  company: string;
  industry: string;
  linkedin_url: string;
  our_product: string;
}

export interface PDFPitchParams {
  company_info: {
    name: string;
    product_name: string;
    website: string;
    sales_rep_name: string;
    sales_rep_contact: string;
  };
  lead_info: {
    name: string;
    company: string;
    industry: string;
  };
}
