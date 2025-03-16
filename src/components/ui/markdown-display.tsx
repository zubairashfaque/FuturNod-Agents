import React from "react";
import { ScrollArea } from "./scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";

interface MarkdownDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({
  content,
  className = "",
  maxHeight = "none", // Changed default to none to show all content
}) => {
  if (!content) return <p>No content available</p>;

  return (
    <ScrollArea className="w-full" style={{ maxHeight }}>
      <div className={`prose prose-sm max-w-none w-full ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default MarkdownDisplay;
