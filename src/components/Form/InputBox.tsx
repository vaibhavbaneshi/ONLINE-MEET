import React from "react";

interface InputBoxProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: Boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  onChange,
  className,
  error,
}) => {
  return (
    <div className="md:col-span-5 mb-4">
      {!error && (
        <input
          placeholder={placeholder}
          onChange={onChange}
          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${className}`}
        />
      )}
      {error && (
        <input
          placeholder={placeholder}
          onChange={onChange}
          className={`h-10 border border-rose-500 mt-1 rounded px-4 w-full bg-gray-50 ${className}`}
        />
      )}
    </div>
  );
};

export default InputBox;
