import React from "react";
import { ScrollArea } from "./scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./markdown.css";

interface EnhancedMarkdownDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

/**
 * This component is a more advanced version of MarkdownDisplay that uses ReactMarkdown
 * It properly renders markdown with formatting including headers, lists, tables, etc.
 */
const EnhancedMarkdownDisplay: React.FC<EnhancedMarkdownDisplayProps> = ({
  content,
  className = "",
  maxHeight = "none", // Changed default to none to show all content
}) => {
  if (!content) return <p>No content available</p>;

  return (
    <ScrollArea className="w-full" style={{ maxHeight }}>
      <div className={`prose prose-sm max-w-none w-full ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
};

export default EnhancedMarkdownDisplay;
