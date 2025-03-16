import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, BarChart2, Target, FileText } from "lucide-react";

const DealCraftInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">DealCraft</h2>
        <p className="text-gray-600">
          Create customized, persuasive sales proposals by analyzing
          requirements and crafting pricing strategies that align perfectly with
          your prospect's needs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Customer Analysis:</strong> Analyze customer information
              including industry, size, challenges, and budget constraints.
            </li>
            <li>
              <strong>Product Alignment:</strong> Match your products and
              services to the specific needs identified in the customer
              analysis.
            </li>
            <li>
              <strong>Pricing Strategy:</strong> Develop optimal pricing models
              based on customer budget and value perception.
            </li>
            <li>
              <strong>Value Proposition:</strong> Craft compelling unique
              selling points that address the customer's pain points.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Increased Conversion Rates</h3>
            <p className="text-gray-600 pl-4">
              Tailored proposals that speak directly to customer needs
              significantly improve conversion rates.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Optimized Pricing</h3>
            <p className="text-gray-600 pl-4">
              Strategic pricing recommendations that maximize deal value while
              staying within customer budget constraints.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Time Efficiency</h3>
            <p className="text-gray-600 pl-4">
              Reduce proposal creation time from hours to minutes with
              AI-powered analysis and recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Consistent Messaging</h3>
            <p className="text-gray-600 pl-4">
              Ensure all sales proposals maintain consistent brand messaging
              while being personalized for each prospect.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-purple-500" />
            Who Should Use This
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">DealCraft is perfect for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Sales representatives looking to improve proposal quality and
              close rates
            </li>
            <li>
              Sales managers seeking to standardize proposal processes across
              teams
            </li>
            <li>
              Business development professionals targeting enterprise clients
            </li>
            <li>
              Consultants who need to quickly create customized client proposals
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          DealCraft transforms the proposal creation process by combining deep
          customer insights with strategic pricing and value propositions. The
          result is highly persuasive, personalized sales proposals that
          significantly improve deal closure rates and customer satisfaction.
        </p>
      </div>
    </div>
  );
};

export default DealCraftInfo;
