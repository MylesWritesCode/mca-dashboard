import { useEffect, useRef } from "react";
import "./SearchPrompt.css";

export interface SearchPromptProps {
  placeholder?: string;
}

export function SearchPrompt({
  placeholder = "Press ctrl/cmd + k to search",
}: SearchPromptProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.code === "KeyK" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
  });

  return (
    <div className="search-prompt-container">
      <input
        className="search-prompt"
        ref={ref}
        type="text"
        placeholder={placeholder}
      />
      {/* @todo Add fuzzy search */}
    </div>
  );
}

export default SearchPrompt;
