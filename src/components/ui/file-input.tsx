'use client';

import React from 'react';

interface FileInputProps {
  id: string;
  label?: string;
  optional?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  optional,
  accept = 'image/*',
  onChange,
  className = '',
}) => {
  const [fileName, setFileName] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || '');
    onChange(file);
  };

  return (
    <div>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium mb-2 text-cream"
          >
            {label}
          </label>
        )}
        {optional && <span className="text-sm text-cream">Optional</span>}
      </div>

      <label
        htmlFor={id}
        className={`block w-full rounded-md bg-primary px-4 py-2 text-white shadow-xs cursor-pointer hover:bg-secondary transition ${className}`}
      >
        {fileName || 'Choose an image'}
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileInput;
