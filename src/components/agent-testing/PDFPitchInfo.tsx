import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Target, Clock, Users } from "lucide-react";

const PDFPitchInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">PDFPitch</h2>
        <p className="text-gray-600">
          One-page sales pitch creator that researches leads, analyzes product
          alignment, and creates concise, visually appealing sales PDFs that
          capture attention.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-blue-500" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Lead Research:</strong> Analyze the lead's company,
              industry, and potential pain points based on available
              information.
            </li>
            <li>
              <strong>Product Alignment:</strong> Identify how your product's
              features and benefits specifically address the lead's challenges.
            </li>
            <li>
              <strong>Content Creation:</strong> Generate concise, compelling
              content that highlights value propositions most relevant to the
              lead.
            </li>
            <li>
              <strong>PDF Generation:</strong> Format the content into a
              professionally designed, one-page PDF that's ready to share.
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
            <h3 className="font-medium mb-2">Immediate Impact</h3>
            <p className="text-gray-600 pl-4">
              Create attention-grabbing, one-page pitches that convey your value
              proposition in seconds rather than minutes.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Perfect Customization</h3>
            <p className="text-gray-600 pl-4">
              Each pitch is tailored to the specific lead, highlighting only the
              most relevant benefits and solutions.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Professional Design</h3>
            <p className="text-gray-600 pl-4">
              Generate visually appealing PDFs that enhance your brand
              perception and stand out from generic sales materials.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Time Efficiency</h3>
            <p className="text-gray-600 pl-4">
              Create custom pitch documents in minutes instead of hours,
              allowing your team to focus on engagement.
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
          <p className="text-gray-600 mb-4">PDFPitch is ideal for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Sales representatives who need to quickly create customized
              leave-behinds
            </li>
            <li>Business development teams reaching out to new prospects</li>
            <li>Marketing teams supporting sales with tailored collateral</li>
            <li>
              Executives preparing for high-value meetings who need concise
              materials
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-lg font-medium text-blue-800">
          PDFPitch transforms the way you create sales collateral by generating
          highly personalized, one-page pitch documents that capture attention
          and communicate value instantly. By focusing only on what matters most
          to each lead, you'll create more impactful first impressions and
          improve engagement rates.
        </p>
      </div>
    </div>
  );
};

export default PDFPitchInfo;
