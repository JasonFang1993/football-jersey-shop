import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-[0.1em] text-muted">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={cn(
          "block w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-background transition-colors",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
            : "border-border focus:border-accent focus:ring-accent/30"
        )}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
