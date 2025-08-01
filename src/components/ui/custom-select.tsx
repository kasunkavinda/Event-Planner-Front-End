'use client';

import React, {
  useState,
  useRef,
  useEffect,
  SelectHTMLAttributes,
} from 'react';

interface CustomSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: { code: string; value: string }[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      options,
      placeholder = 'Select an option',
      onValueChange,
      onChange,
      className,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      props.value?.toString() || defaultValue?.toString() || '',
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Update selected value when defaultValue changes
    useEffect(() => {
      if (defaultValue !== undefined) {
        setSelectedValue(defaultValue.toString());
      }
    }, [defaultValue]);

    // Update selected value when value prop changes (for controlled components)
    useEffect(() => {
      if (props.value !== undefined) {
        setSelectedValue(props.value.toString());
      }
    }, [props.value]);

    // Initialize with value prop on first render if available
    useEffect(() => {
      if (props.value !== undefined && selectedValue === '') {
        setSelectedValue(props.value.toString());
      }
    }, []); // Run only on mount

    const handleSelectOption = (optionCode: string) => {
      setSelectedValue(optionCode);
      setIsOpen(false);

      // Call the onValueChange callback
      if (onValueChange) {
        onValueChange(optionCode);
      }

      // Create a synthetic event to trigger onChange if provided
      if (onChange) {
        const syntheticEvent = {
          target: { value: optionCode },
          currentTarget: { value: optionCode },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    };

    const getSelectedLabel = () => {
      if (!selectedValue) return placeholder;
      const selectedOption = options.find(
        option => option.code === selectedValue,
      );
      return selectedOption ? selectedOption.value : placeholder;
    };

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Hidden select for form submission */}
        <select
          {...props}
          ref={ref}
          value={selectedValue}
          onChange={e => setSelectedValue(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => (
            <option key={option.code} value={option.code}>
              {option.value}
            </option>
          ))}
        </select>

        {/* Custom dropdown button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full rounded-md bg-primary px-4 mt-2 py-2 pr-10 text-white shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none text-left cursor-pointer transition-colors duration-200 hover:bg-opacity-80 ${className}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedValue ? 'text-white' : 'text-gray-300'}>
            {getSelectedLabel()}
          </span>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className={`w-5 h-5 text-white transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Custom dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-primary border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map(option => (
              <div
                key={option.code}
                onClick={() => handleSelectOption(option.code)}
                className={`px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-secondary hover:bg-opacity-20 ${
                  selectedValue === option.code
                    ? 'bg-secondary bg-opacity-30 text-white'
                    : 'text-white hover:text-white'
                }`}
                role="option"
                aria-selected={selectedValue === option.code}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
