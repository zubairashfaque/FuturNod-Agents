import React from "react";

interface FallbackMarkdownDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

/**
 * A simple fallback markdown display component that doesn't use ReactMarkdown
 * Use this if the other markdown components are causing issues
 */
const FallbackMarkdownDisplay: React.FC<FallbackMarkdownDisplayProps> = ({
  content,
  className = "",
  maxHeight = "none",
}) => {
  if (!content) return <div className="p-4">No content available</div>;

  return (
    <div className="w-full h-full overflow-auto">
      <div
        className={`whitespace-pre-wrap p-4 ${className}`}
        style={{
          width: "100%",
          lineHeight: "1.6",
          fontSize: "0.95rem",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default FallbackMarkdownDisplay;
