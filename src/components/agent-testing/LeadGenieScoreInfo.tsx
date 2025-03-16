import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, BarChart2, FileText } from "lucide-react";

const LeadGenieScoreInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Lead Genie Score</h2>
        <p className="text-gray-600">
          Lead Genie Score is your ultimate lead qualification engine, providing
          a clear, step-by-step process to analyze, research, and score leads
          for maximum sales success. From identifying high-potential leads to
          crafting tailored engagement strategies, this tool ensures you never
          miss out on a promising opportunity!
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
              <strong>Lead Form Analysis:</strong> Dive into lead form responses
              to extract essential details like company name, industry, pain
              points, and interest level.
            </li>
            <li>
              <strong>Industry & Company Research:</strong> Conduct a detailed
              investigation of the lead's industry landscape and company
              profile.
            </li>
            <li>
              <strong>Lead Scoring:</strong> Assign scores to leads based on
              relevance, fit, engagement level, and potential value.
            </li>
            <li>
              <strong>Tailored Strategy Creation:</strong> Develop customized
              talking points and engagement ideas designed to resonate with each
              lead.
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
            <h3 className="font-medium mb-2">Better Lead Qualification:</h3>
            <p className="text-gray-600 pl-4">
              A structured process ensures leads are evaluated accurately and
              efficiently. Score leads based on factors like company size,
              industry relevance, interest level, and buying potential.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Informed Decision-Making:</h3>
            <p className="text-gray-600 pl-4">
              Combines detailed research with data analysis to provide a
              holistic view of each lead. Helps your team prioritize leads
              effectively, ensuring time is spent where it matters most.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Improved Sales Planning:</h3>
            <p className="text-gray-600 pl-4">
              Gain valuable insights that help craft tailored pitches and
              strategic outreach plans. Utilize clear talking points designed to
              address specific pain points and objectives.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Efficient Lead Management:</h3>
            <p className="text-gray-600 pl-4">
              Automates much of the research and analysis process, saving your
              team valuable time. Keeps your sales pipeline organized,
              optimized, and ready to convert leads into clients.
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
            This template is perfect for Sales Teams and Business Development
            Professionals who want to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Boost lead conversion rates by qualifying and prioritizing the
              right prospects
            </li>
            <li>Develop targeted outreach plans backed by data and research</li>
            <li>
              Streamline the lead management process with clear, actionable
              insights
            </li>
            <li>
              Maximize sales efficiency by focusing efforts on high-potential
              leads
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          Lead Genie Score goes beyond just gathering data—it transforms it into
          actionable strategies that empower your sales team to approach leads
          with confidence.
        </p>
      </div>
    </div>
  );
};

export default LeadGenieScoreInfo;
