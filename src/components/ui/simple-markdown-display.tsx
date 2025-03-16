import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SimpleMarkdownDisplayProps {
  content: string;
  className?: string;
}

const SimpleMarkdownDisplay: React.FC<SimpleMarkdownDisplayProps> = ({
  content,
  className = "",
}) => {
  if (!content) {
    return <div className="p-4 text-gray-500">No content available</div>;
  }

  return (
    <div
      className={`bg-white p-4 rounded-md border border-gray-200 ${className}`}
    >
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SimpleMarkdownDisplay;
