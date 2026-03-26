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
    <div className="flex flex-col flex-1 min-h-0 border-t border-neutral-800">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          JSON
        </h3>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded ${
            isValid
              ? "bg-green-900/40 text-green-400"
              : "bg-red-900/40 text-red-400"
          }`}
        >
          {isValid ? "valid" : "invalid"}
        </span>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck={false}
        className={`flex-1 bg-neutral-950 text-neutral-300 font-mono text-[11px] leading-[1.4] p-3 resize-none outline-none border-t ${
          isValid ? "border-neutral-800" : "border-red-800"
        }`}
        style={{ minHeight: "200px" }}
      />
    </div>
  );
}
