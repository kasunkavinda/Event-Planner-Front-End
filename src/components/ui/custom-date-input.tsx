"use client";

import React, { useState, useRef, useEffect, InputHTMLAttributes } from "react";

interface CustomDateInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  minDate?: string;
  maxDate?: string;
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
}

const CustomDateInput = React.forwardRef<
  HTMLInputElement,
  CustomDateInputProps
>(
  (
    {
      placeholder = "Select a date",
      onValueChange,
      onChange,
      className,
      defaultValue,
      minDate,
      maxDate,
      dateFormat = "DD/MM/YYYY",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
      defaultValue?.toString() || ""
    );
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (defaultValue !== undefined) {
        setSelectedDate(defaultValue.toString());
      }
    }, [defaultValue]);

    useEffect(() => {
      if (props.value !== undefined) {
        setSelectedDate(props.value.toString());
      }
    }, [props.value]);

    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      switch (dateFormat) {
        case "MM/DD/YYYY":
          return `${month}/${day}/${year}`;
        case "YYYY-MM-DD":
          return `${year}-${month}-${day}`;
        case "DD/MM/YYYY":
        default:
          return `${day}/${month}/${year}`;
      }
    };

    const parseDate = (dateString: string): Date | null => {
      if (!dateString) return null;

      let day: number, month: number, year: number;

      try {
        switch (dateFormat) {
          case "MM/DD/YYYY":
            [month, day, year] = dateString.split("/").map(Number);
            break;
          case "YYYY-MM-DD":
            [year, month, day] = dateString.split("-").map(Number);
            break;
          case "DD/MM/YYYY":
          default:
            [day, month, year] = dateString.split("/").map(Number);
            break;
        }

        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
        if (month < 1 || month > 12) return null;
        if (day < 1 || day > 31) return null;
        if (year < 1900 || year > 2100) return null;

        const date = new Date(year, month - 1, day);

        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          return null;
        }

        return date;
      } catch (error) {
        return null;
      }
    };
    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) {
        return;
      }

      const formattedDate = formatDate(date);
      setSelectedDate(formattedDate);
      setIsOpen(false);

      if (onValueChange) {
        onValueChange(formattedDate);
      }

      if (onChange) {
        const syntheticEvent = {
          target: { value: formattedDate },
          currentTarget: { value: formattedDate },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const isDateDisabled = (date: Date): boolean => {
      const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (minDate) {
        const min = parseDate(minDate);
        if (min) {
          const minOnly = new Date(
            min.getFullYear(),
            min.getMonth(),
            min.getDate()
          );
          if (dateOnly < minOnly) return true;
        }
      }
      if (maxDate) {
        const max = parseDate(maxDate);
        if (max) {
          const maxOnly = new Date(
            max.getFullYear(),
            max.getMonth(),
            max.getDate()
          );
          if (dateOnly > maxOnly) return true;
        }
      }
      return false;
    };

    const getDaysInMonth = (date: Date): Date[] => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days: Date[] = [];

      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(new Date(year, month, -startingDayOfWeek + i + 1));
      }

      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      const remainingCells = 42 - days.length;
      for (let day = 1; day <= remainingCells; day++) {
        days.push(new Date(year, month + 1, day));
      }

      return days;
    };

    const navigateMonth = (direction: "prev" | "next") => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        if (direction === "prev") {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    };

    const isToday = (date: Date): boolean => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const isSelected = (date: Date): boolean => {
      if (!selectedDate) return false;
      const selected = parseDate(selectedDate);
      return selected ? formatDate(date) === formatDate(selected) : false;
    };

    const isCurrentMonth = (date: Date): boolean => {
      return date.getMonth() === currentMonth.getMonth();
    };

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSelectedDate(value);

      if (onValueChange) {
        onValueChange(value);
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Manual input field */}
        <input
          {...props}
          ref={ref}
          type="text"
          value={selectedDate}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`block w-full rounded-md bg-primary px-4 py-2 mt-2 pr-10 text-white placeholder-gray-300 shadow-xs focus:border-secondary focus:ring-secondary focus-visible:outline-none transition-colors duration-200 ${className}`}
        />

        {/* Calendar icon button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-white hover:text-gray-300 transition-colors duration-200"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Custom date picker */}
        {isOpen && (
          <div className="absolute z-50 w-80 mt-1 bg-primary border border-gray-600 rounded-md shadow-lg">
            {/* Month navigation */}
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="p-1 rounded hover:bg-secondary hover:bg-opacity-20 text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-white">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="p-1 rounded hover:bg-secondary hover:bg-opacity-20 text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Calendar grid */}
            <div className="p-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-300 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((date, index) => {
                  const disabled = isDateDisabled(date);
                  const today = isToday(date);
                  const selected = isSelected(date);
                  const currentMonthDate = isCurrentMonth(date);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => !disabled && handleDateSelect(date)}
                      disabled={disabled}
                      className={`
                        w-8 h-8 text-sm rounded transition-colors duration-150
                        ${
                          disabled
                            ? "text-gray-500 cursor-not-allowed"
                            : currentMonthDate
                            ? "text-white hover:bg-secondary hover:bg-opacity-20 cursor-pointer"
                            : "text-gray-400 hover:bg-secondary hover:bg-opacity-10 cursor-pointer"
                        }
                        ${selected ? "bg-secondary text-white" : ""}
                        ${today && !selected ? "ring-1 ring-secondary" : ""}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
