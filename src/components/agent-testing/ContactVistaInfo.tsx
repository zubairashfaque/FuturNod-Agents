import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Target, Users, MessageSquare } from "lucide-react";

const ContactVistaInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">ContactVista</h2>
        <p className="text-gray-600">
          AI-powered personalized email system that researches prospects,
          identifies their needs, and crafts tailored messages that resonate and
          drive engagement.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Prospect Research:</strong> Analyze the prospect's
              background, role, company, and industry to understand their
              context.
            </li>
            <li>
              <strong>Need Identification:</strong> Identify potential pain
              points and challenges based on the prospect's position and
              industry trends.
            </li>
            <li>
              <strong>Product Alignment:</strong> Match your product's features
              and benefits to the prospect's specific needs and challenges.
            </li>
            <li>
              <strong>Email Crafting:</strong> Generate a personalized email
              with relevant messaging, tone, and call-to-action optimized for
              the recipient.
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
            <h3 className="font-medium mb-2">Higher Response Rates</h3>
            <p className="text-gray-600 pl-4">
              Personalized emails that address specific pain points generate
              significantly higher response rates than generic templates.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Time Efficiency</h3>
            <p className="text-gray-600 pl-4">
              Create highly personalized outreach in minutes instead of hours,
              allowing for more prospect engagement.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Consistent Quality</h3>
            <p className="text-gray-600 pl-4">
              Maintain high-quality messaging across all prospect communications
              regardless of sales rep experience level.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Continuous Improvement</h3>
            <p className="text-gray-600 pl-4">
              Learn from successful emails to refine and improve future outreach
              strategies.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Who Should Use This
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">ContactVista is perfect for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Sales development representatives conducting outbound prospecting
            </li>
            <li>Account executives reaching out to qualified leads</li>
            <li>Business development professionals seeking partnerships</li>
            <li>Recruiters connecting with potential candidates</li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          ContactVista transforms cold outreach into warm, personalized
          connections by leveraging AI to research prospects and craft messages
          that truly resonate. By addressing specific pain points and
          demonstrating a deep understanding of the prospect's context, you'll
          significantly improve engagement rates and conversion opportunities.
        </p>
      </div>
    </div>
  );
};

export default ContactVistaInfo;
