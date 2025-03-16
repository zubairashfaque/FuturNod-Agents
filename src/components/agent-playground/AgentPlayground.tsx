import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import AgentCard from "./AgentCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../ui/loading-spinner";

// Agent Icons
import {
  Users,
  Sparkles,
  Code,
  BarChart2,
  Image,
  FileText,
  Rocket,
  Mail,
  FileUp,
  Briefcase,
} from "lucide-react";

const AgentPlayground = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const agents = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "LeadGenie",
      description:
        "Find and connect with the right people at target companies by researching companies, analyzing their structure, and identifying decision-makers",
      tags: ["Sales", "Lead Generation", "B2B"],
      link: "/agent-testing",
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Lead Genie Score",
      description:
        "Analyze, research, and score leads for maximum sales success. Prioritize leads and develop tailored engagement strategies.",
      tags: ["Lead Scoring", "Sales", "Qualification"],
      link: "/lead-genie-score",
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "MarketMatch",
      description:
        "Analyze companies, identify similar prospects, and develop customized outreach strategies that truly resonate.",
      tags: ["Competitor Analysis", "Sales Intelligence", "Outreach"],
      link: "/market-match",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "ContractVista",
      description:
        "AI-driven system that analyzes legal contracts to identify similarities, differences, and potential conflicts.",
      tags: ["Legal", "Contract Analysis", "Document Comparison"],
      link: "/contract-vista",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "DealCraft",
      description:
        "AI-powered sales offer system that creates customized, persuasive sales proposals by analyzing requirements and crafting pricing strategies.",
      tags: ["Sales Proposals", "Pricing Strategy", "Offer Creation"],
      link: "/deal-craft",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "BriefVista",
      description:
        "AI-powered meeting preparation system that researches participants, analyzes industry trends, and creates strategic approaches for meetings.",
      tags: ["Meeting Prep", "Research", "Strategy"],
      link: "/brief-vista",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "ContactVista",
      description:
        "AI-powered personalized email system that researches prospects, identifies their needs, and crafts tailored messages for outreach.",
      tags: ["Email Outreach", "Personalization", "Sales"],
      link: "/contact-vista",
    },
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "PDFPitch",
      description:
        "One-page sales pitch creator that researches leads, analyzes product alignment, and creates concise, professionally designed sales PDFs.",
      tags: ["Sales Pitch", "PDF Creation", "Lead Research"],
      link: "/pdf-pitch",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Text Generator",
      description:
        "Generate creative and contextually relevant text based on your prompts",
      tags: ["Creative", "Content", "Writing"],
      link: "/",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Assistant",
      description:
        "Generate, explain, and debug code across multiple programming languages",
      tags: ["Coding", "Development", "Debugging"],
      link: "/",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Image Prompt Generator",
      description: "Create detailed prompts for image generation AI models",
      tags: ["Creative", "Images", "Prompting"],
      link: "/",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Content Summarizer",
      description:
        "Create concise summaries of long-form content while preserving key information",
      tags: ["Productivity", "Research", "Content"],
      link: "/",
    },
  ];

  const filteredAgents = agents.filter(
    (agent) =>
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleReset = () => {
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">AI Agents Playground</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search agents..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent, index) => (
          <AgentCard
            key={index}
            icon={agent.icon}
            title={agent.title}
            description={agent.description}
            tags={agent.tags}
            link={agent.link}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentPlayground;
