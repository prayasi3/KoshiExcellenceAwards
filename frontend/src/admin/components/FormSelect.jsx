import React, { forwardRef } from "react";
const FormSelect = forwardRef(
  (
    {
      label,
      error,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-6">
        {label && (
          <label className="block mb-2 font-medium text-[#0B1F3A]">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            outline-none
            transition
            border-gray-300
            focus:border-[#C9A84C]
            focus:ring-2
            focus:ring-[#C9A84C]/20
            ${className}
          `}
          {...props}
        >
          {children}
        </select>

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;