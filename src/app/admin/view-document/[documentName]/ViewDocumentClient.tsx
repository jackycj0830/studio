
"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, strikethrough, etc.)

interface ViewDocumentClientProps {
  markdownContent: string;
}

export default function ViewDocumentClient({ markdownContent }: ViewDocumentClientProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
