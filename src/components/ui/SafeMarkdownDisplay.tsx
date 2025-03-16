import React, { useState, useEffect, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
import MarkdownDisplay from "./markdown-display";
import FallbackMarkdownDisplay from "./fallback-markdown-display";

interface SafeMarkdownDisplayProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

/**
 * A wrapper component that uses ErrorBoundary to catch any errors in markdown rendering
 * and falls back to a simpler display if needed
 */
const SafeMarkdownDisplay: React.FC<SafeMarkdownDisplayProps> = (props) => {
  const [hasError, setHasError] = useState(false);
  const [content, setContent] = useState(props.content || "");
  const contentRef = useRef<HTMLDivElement>(null);

  // Update content when props change
  useEffect(() => {
    setContent(props.content || "");
  }, [props.content]);

  // If content is too large or complex, use the fallback display
  useEffect(() => {
    try {
      // Reset error state when content changes
      setHasError(false);

      // If content is extremely large, use fallback
      if (content && content.length > 50000) {
        console.log("Content too large, using fallback display");
        setHasError(true);
      }
    } catch (error) {
      console.error("Error in SafeMarkdownDisplay:", error);
      setHasError(true);
    }
  }, [content]);

  // Ensure the container has a background color
  const containerStyle = {
    backgroundColor: "white",
    width: "100%",
    height: props.maxHeight || "auto",
    overflow: "auto",
    borderRadius: "0.375rem",
  };

  if (hasError) {
    return (
      <div
        style={containerStyle}
        ref={contentRef}
        className={`safe-markdown-container ${props.className || ""}`}
      >
        <FallbackMarkdownDisplay
          content={content}
          className={props.className}
          maxHeight={props.maxHeight}
        />
      </div>
    );
  }

  return (
    <div
      style={containerStyle}
      ref={contentRef}
      className={`safe-markdown-container ${props.className || ""}`}
    >
      <ErrorBoundary
        fallback={
          <FallbackMarkdownDisplay
            content={content}
            className={props.className}
            maxHeight={props.maxHeight}
          />
        }
      >
        <MarkdownDisplay
          content={content}
          className={props.className}
          maxHeight={props.maxHeight}
        />
      </ErrorBoundary>
    </div>
  );
};

export default SafeMarkdownDisplay;
