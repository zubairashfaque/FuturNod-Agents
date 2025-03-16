import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Lightbulb, Calendar } from "lucide-react";

const BriefVistaInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">BriefVista</h2>
        <p className="text-gray-600">
          AI-powered meeting preparation system that researches participants,
          analyzes industry trends, and creates strategic approaches for more
          effective meetings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Participant Research:</strong> Gather detailed information
              about each meeting participant, including their background, role,
              and interests.
            </li>
            <li>
              <strong>Company Analysis:</strong> Research the company's recent
              news, market position, challenges, and opportunities.
            </li>
            <li>
              <strong>Context Evaluation:</strong> Analyze the meeting context
              and objectives to determine the most effective approach.
            </li>
            <li>
              <strong>Strategy Development:</strong> Create a comprehensive
              meeting brief with talking points, questions, and strategic
              recommendations.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Enhanced Preparation</h3>
            <p className="text-gray-600 pl-4">
              Walk into every meeting fully prepared with comprehensive insights
              about all participants and relevant topics.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Time Efficiency</h3>
            <p className="text-gray-600 pl-4">
              Reduce meeting preparation time from hours to minutes while
              actually increasing the quality of preparation.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Strategic Advantage</h3>
            <p className="text-gray-600 pl-4">
              Gain a competitive edge by identifying key discussion points and
              potential objections before they arise.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Improved Outcomes</h3>
            <p className="text-gray-600 pl-4">
              Achieve better meeting results through targeted preparation and
              strategic conversation planning.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Who Should Use This
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">BriefVista is ideal for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sales professionals preparing for important client meetings</li>
            <li>Business development teams engaging with potential partners</li>
            <li>
              Executives preparing for board meetings or investor presentations
            </li>
            <li>Account managers looking to strengthen client relationships</li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          BriefVista transforms meeting preparation by providing comprehensive,
          AI-powered insights that help you walk into every meeting fully
          prepared. By understanding participants, company context, and meeting
          objectives, you'll be able to lead more productive discussions and
          achieve better outcomes.
        </p>
      </div>
    </div>
  );
};

export default BriefVistaInfo;
