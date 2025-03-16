import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, BarChart2, FileText } from "lucide-react";

const MarketMatchInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">MarketMatch</h2>
        <p className="text-gray-600">
          Your ultimate sales intelligence tool, providing a step-by-step
          process to analyze companies, identify similar prospects, and develop
          customized outreach strategies that truly resonate. Whether you're
          diving into competitor analysis or refining your SEO game, this tool
          has your back!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Company Analysis:</strong> Conduct an in-depth review of a
              company's profile, including their strengths, weaknesses,
              opportunities, and threats.
            </li>
            <li>
              <strong>Similarity Detection:</strong> Identify companies that
              share key attributes with your existing clients, making them prime
              candidates for outreach.
            </li>
            <li>
              <strong>Similarity Evaluation:</strong> Compare and evaluate how
              closely these companies align with your target criteria.
            </li>
            <li>
              <strong>Tailored Sales Approach:</strong> Craft highly
              personalized outreach strategies designed to win over these new
              prospects.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">
              Comprehensive Competitor Analysis:
            </h3>
            <p className="text-gray-600 pl-4">
              Get a deep understanding of your competitors' strategies.
              Highlight their strengths and weaknesses to craft a better
              approach.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">SEO-Driven Insights:</h3>
            <p className="text-gray-600 pl-4">
              Gain access to a list of keywords your competitors are targeting.
              Improve your SEO strategies by identifying high-impact keywords
              you may be missing.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Find Differentiators:</h3>
            <p className="text-gray-600 pl-4">
              Clearly identify what makes your company stand out from the crowd.
              Refine your messaging to highlight unique strengths and
              advantages.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Strategic Opportunities:</h3>
            <p className="text-gray-600 pl-4">
              Spot gaps in your competitors' strategies. Capitalize on
              unaddressed needs or overlooked market segments.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-green-500" />
            Who Should Use This
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            This template is perfect for Sales and Business Development teams
            who want to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Expand their prospect list by discovering companies that mirror
              their best clients.
            </li>
            <li>
              Boost conversion rates through targeted, research-backed outreach.
            </li>
            <li>
              Stay ahead of the competition by continuously refining their sales
              and marketing approaches.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          This template isn't just about gathering data—it's about transforming
          insights into powerful, actionable sales strategies. By systematically
          breaking down your competitors and identifying prime prospects, you
          can supercharge your outreach efforts and consistently close more
          deals.
        </p>
      </div>
    </div>
  );
};

export default MarketMatchInfo;
