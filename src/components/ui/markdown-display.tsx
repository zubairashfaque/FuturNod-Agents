import React from "react";
import { ScrollArea } from "./scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({
  content,
  className = "",
  maxHeight = "none",
}) => {
  if (!content) return <div className="p-4">No content available</div>;

  // Simple text rendering as fallback
  const renderAsPlainText = () => {
    return (
      <div className={`whitespace-pre-wrap p-4 ${className}`}>{content}</div>
    );
  };

  try {
    return (
      <div className="w-full h-full">
        <div
          className={`prose prose-sm max-w-none p-4 markdown-content ${className}`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return renderAsPlainText();
  }
};

export default MarkdownDisplay;
