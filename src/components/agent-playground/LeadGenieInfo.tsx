import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, Users, Clock } from "lucide-react";

const LeadGenieInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">LeadGenie</h2>
        <p className="text-gray-600">
          LeadGenie is a powerful tool designed to help sales teams and business
          developers find and connect with the right people at target companies
          more effectively. It does this by researching companies, analyzing
          their structure, identifying decision-makers, and creating tailored
          strategies for outreach.
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
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Utilizes tools like Serper API, OpenAI, and ScrapeWebsiteTool to
              gather and analyze information about companies.
            </li>
            <li>
              Examines company structures, identifies key decision-makers, and
              determines the best approach for engagement.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            How It Adds Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">
              Better Understanding of Companies:
            </h3>
            <p className="text-gray-600 pl-4">
              Provides a clear picture of a company's structure and identifies
              key contacts, saving time and ensuring you're targeting the right
              leads.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Targeted Sales Strategies:</h3>
            <p className="text-gray-600 pl-4">
              Helps you craft personalized outreach plans that address the
              specific needs and goals of your target companies.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Finding the Right People:</h3>
            <p className="text-gray-600 pl-4">
              Focuses your efforts on decision-makers, boosting your chances of
              success.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Improved Efficiency:</h3>
            <p className="text-gray-600 pl-4">
              Automates research and planning, allowing your sales team to spend
              more time on outreach and closing deals rather than gathering
              information.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          Overall, LeadGenie makes your sales process smarter, faster, and more
          effective. Want me to show you how to build something like this? 😊
        </p>
      </div>
    </div>
  );
};

export default LeadGenieInfo;
