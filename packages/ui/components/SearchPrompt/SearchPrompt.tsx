import { useEffect, useMemo, useRef } from "react";

import debounce from "lodash.debounce";

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

      if (e.code === "Escape") {
        ref.current?.blur();
      }
    };

    return () => {
      debouncedHandleChange.cancel(); // Exit memo when unmounting
    };
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (value.length < 3) return;

    // @todo Add search functionality based on value.
    console.log(value);
  }

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), []);

  return (
    <div className="search-prompt-container">
      <input
        className="search-prompt"
        ref={ref}
        type="text"
        placeholder={placeholder}
        onChange={debouncedHandleChange}
      />
      {/* @todo Add fuzzy search */}
    </div>
  );
}

export default SearchPrompt;