
import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface VotingFormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
  required: boolean;
  options: Option[];
}

export const VotingFormSelect: React.FC<VotingFormSelectProps> = ({
  id,
  label,
  value,
  onChange,
  disabled,
  required,
  options
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-input transition-all",
          disabled && !value ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        )}
        disabled={disabled}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
