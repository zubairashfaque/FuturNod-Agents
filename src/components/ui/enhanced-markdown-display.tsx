import React from "react";
import { ScrollArea } from "./scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

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
  maxHeight = "none",
}) => {
  if (!content) return <div className="p-4">No content available</div>;

  // Simple text rendering as fallback
  const renderAsPlainText = () => {
    return <div className={`whitespace-pre-wrap ${className}`}>{content}</div>;
  };

  try {
    return (
      <ScrollArea className="w-full" style={{ maxHeight }}>
        <div className={`prose prose-sm max-w-none ${className}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    );
  } catch (error) {
    console.error("Error rendering enhanced markdown:", error);
    return renderAsPlainText();
  }
};

export default EnhancedMarkdownDisplay;
