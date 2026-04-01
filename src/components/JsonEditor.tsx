"use client";

import { useState, useEffect, useRef } from "react";

interface JsonEditorProps {
  value: string;
  onChange: (json: string) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  const [text, setText] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
    setIsValid(true);
  }, [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    try {
      JSON.parse(newText);
      setIsValid(true);
      onChange(newText);
    } catch {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ borderTop: "1px solid #93a1a1" }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ backgroundColor: "#eee8d5" }}>
        <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#93a1a1" }}>
          JSON
        </h3>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={
            isValid
              ? { backgroundColor: "rgba(133,153,0,0.15)", color: "#859900" }
              : { backgroundColor: "rgba(220,50,47,0.15)", color: "#dc322f" }
          }
        >
          {isValid ? "valid" : "invalid"}
        </span>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck={false}
        className="flex-1 font-mono text-[11px] leading-[1.4] p-3 resize-none outline-none"
        style={{
          backgroundColor: "#073642",
          color: "#839496",
          borderTop: isValid ? "1px solid #93a1a1" : "1px solid #dc322f",
          minHeight: "200px",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        }}
      />
    </div>
  );
}
