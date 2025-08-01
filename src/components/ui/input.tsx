import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import CustomSelect from "./custom-select";
import CustomDateInput from "./custom-date-input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  optional?: boolean;
  maxChars?: number;
  textarea?: false;
  className?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "number"
    | "tel"
    | "hidden"
    | "date"
    | "time"
    | "checkbox";
  options?: never;
  pattern?: string;
  minDate?: never;
  maxDate?: never;
  dateFormat?: never;
}

interface DateProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  optional?: boolean;
  className?: string;
  type: "date";
  maxChars?: never;
  textarea?: never;
  options?: never;
  minDate?: string;
  maxDate?: string;
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  optional?: boolean;
  maxChars?: number;
  textarea: true;
  className?: string;
  type: "textarea";
  options?: never;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  optional?: boolean;
  className?: string;
  type: "select";
  maxChars?: never;
  textarea?: never;
  options: { code: string; value: string }[];
}

type FormFieldProps = InputProps | DateProps | TextareaProps | SelectProps;

const FormField = React.forwardRef<HTMLElement, FormFieldProps>(
  (
    { label, optional, maxChars, textarea, className, type, options, ...props },
    ref
  ) => {
    const optionalId = optional ? `${props.id}-optional` : undefined;
    const maxCharsId = maxChars ? `${props.id}-max` : undefined;

    const inputProps = props as InputHTMLAttributes<HTMLInputElement>;
    const textareaProps = props as TextareaHTMLAttributes<HTMLTextAreaElement>;
    const selectProps = props as SelectHTMLAttributes<HTMLSelectElement>;
    const dateProps = props as InputHTMLAttributes<HTMLInputElement> & {
      minDate?: string;
      maxDate?: string;
      dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
    };

    return (
      <div>
        <div className="flex justify-between">
          {type !== "checkbox" && (
            <div className="flex justify-between">
              {label && (
                <label
                  htmlFor={props.id}
                  className="block text-sm font-medium text-cream"
                >
                  {label}
                </label>
              )}

              {optional && (
                <span id={optionalId} className="text-sm text-cream">
                  Optional
                </span>
              )}
              {maxChars && (
                <span id={maxCharsId} className="text-sm text-cream">
                  Max {maxChars} characters
                </span>
              )}
            </div>
          )}
        </div>
        <div className="">
          {type === "select" && options ? (
            <CustomSelect
              {...selectProps}
              ref={ref as React.Ref<HTMLSelectElement>}
              options={options}
              className={selectProps.className}
              onChange={selectProps.onChange}
            />
          ) : type === "date" ? (
            <CustomDateInput
              {...dateProps}
              ref={ref as React.Ref<HTMLInputElement>}
              className={dateProps.className}
              onChange={dateProps.onChange}
              minDate={dateProps.minDate}
              maxDate={dateProps.maxDate}
              dateFormat={dateProps.dateFormat}
            />
          ) : textarea ? (
            <textarea
              {...textareaProps}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              aria-describedby={maxCharsId}
              className={`block w-full rounded-md  bg-primary  px-4 py-2 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none ${className}`}
            />
          ) : type === "checkbox" ? (
            <div className="flex items-center space-x-2">
              <input
                {...inputProps}
                ref={ref as React.Ref<HTMLInputElement>}
                type="checkbox"
                className={`rounded border-gray-300 checked:bg-green-600 text-secondary focus:ring-secondary ${className}`}
              />
              {label && (
                <label
                  htmlFor={props.id}
                  className="text-sm font-medium text-cream"
                >
                  {label}
                </label>
              )}
            </div>
          ) : (
            <input
              {...inputProps}
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              aria-describedby={optionalId}
              className={`block w-full rounded-md mt-2 bg-primary  px-4 py-2 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none ${className}`}
            />
          )}
        </div>
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
