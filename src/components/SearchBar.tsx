// src/components/SearchBar.tsx
import { Input } from "./ui/input";
import { FiSearch, FiInfo } from "react-icons/fi";
import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "../lib/utils";
import { createPortal } from "react-dom";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);
  const [showHint, setShowHint] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange = useCallback(
    debounce((searchValue: string) => {
      if (searchValue.length >= 3 || searchValue.length === 0) {
        onChange(searchValue);
        setShowHint(false);
      } else if (searchValue.length > 0) {
        setShowHint(true);
      }
    }, 500),
    [onChange]
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (inputRef.current && showHint) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [showHint, localValue]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500 z-10" />
      <Input
        ref={inputRef}
        placeholder="Поиск (минимум 3 символа)..."
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9 bg-white/70 backdrop-blur rounded-xl shadow-sm w-full border-violet-200 focus:border-violet-400"
      />

      {showHint &&
        createPortal(
          <div
            className="fixed bg-white/95 backdrop-blur-lg rounded-xl p-3 border border-violet-200 shadow-lg z-50"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            <div className="flex items-center gap-2 text-violet-700">
              <FiInfo className="w-4 h-4 text-violet-600 flex-shrink-0" />
              <span className="text-sm font-medium">
                Введите минимум 3 символа для поиска
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
