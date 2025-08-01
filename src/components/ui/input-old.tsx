import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ChangeEvent,
  SelectHTMLAttributes,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  optional?: boolean;
  maxChars?: number;
  textarea?: false;
  className?: string; // Add className to InputProps
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'number'
    | 'tel'
    | 'hidden'
    | 'checkbox';
  options?: never;
  pattern?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  optional?: boolean;
  maxChars?: number;
  textarea: true;
  className?: string; // Add className to TextareaProps
  type: 'textarea';
  options?: never;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  optional?: boolean;
  className?: string;
  type: 'select';
  maxChars?: never; // maxChars is not allowed for select
  textarea?: never;
  options: { code: string; value: string }[]; // Add options prop
}

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const FormField = React.forwardRef<HTMLElement, FormFieldProps>(
  (
    { label, optional, maxChars, textarea, className, type, options, ...props },
    ref,
  ) => {
    const optionalId = optional ? `${props.id}-optional` : undefined;
    const maxCharsId = maxChars ? `${props.id}-max` : undefined;

    const inputProps = props as InputHTMLAttributes<HTMLInputElement>;
    const textareaProps = props as TextareaHTMLAttributes<HTMLTextAreaElement>;
    const selectProps = props as SelectHTMLAttributes<HTMLSelectElement>;

    // -- commented out since we use server actions

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //   if (inputProps.onChange) {
    //     inputProps.onChange(event);
    //   }
    // };

    // const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //   if (textareaProps.onChange) {
    //     textareaProps.onChange(event);
    //   }
    // };

    return (
      <div>
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
        <div className="">
          {type === 'select' && options ? (
            <select
              {...selectProps}
              ref={ref as React.Ref<HTMLSelectElement>}
              className={`block w-full rounded-md  bg-primary px-4 py-2 pb-3 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none ${selectProps.className}`}
            >
              {options.map(option => (
                <option key={option.code} value={option.code}>
                  {option.value}
                </option>
              ))}
            </select>
          ) : textarea ? (
            <textarea
              {...textareaProps}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              aria-describedby={maxCharsId}
              className={`block w-full rounded-md  bg-primary  px-4 py-2 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none ${className}`} // Add className
              // onChange={handleTextareaChange} -- commented out since we use server actions
            />
          ) : (
            <input
              {...inputProps}
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              aria-describedby={optionalId}
              className={`block w-full rounded-md  bg-primary  px-4 py-2 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none ${className}`} // Add className
              // onChange={handleInputChange} -- commented out since we use server actions
            />
          )}
        </div>
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
