import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PDFPitchDisplayProps {
  content: string | null | undefined;
}

const PDFPitchDisplay: React.FC<PDFPitchDisplayProps> = ({ content }) => {
  if (!content) {
    return <div className="p-4 text-gray-500">No content available</div>;
  }

  // Simple text rendering as fallback
  const renderAsPlainText = () => {
    return (
      <div className="whitespace-pre-wrap p-4 bg-white rounded-md border border-gray-200">
        {content}
      </div>
    );
  };

  try {
    return (
      <div className="bg-white p-4 rounded-md border border-gray-200 overflow-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return renderAsPlainText();
  }
};

export default PDFPitchDisplay;
