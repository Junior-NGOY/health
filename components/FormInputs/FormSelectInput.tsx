"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
//import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: (option: Option) => void;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
  className?: string;
  isLoading?: boolean; 
};
export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
  isMultiple = false,
  className,
  isLoading = false,
}: FormSelectInputProps) {
  return (
    <div className={`form-select-input ${className}`}>
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
     <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Select
          isSearchable={isSearchable}
          primaryColor="blue"
          value={option}
          onChange={(item) => {
            if (item !== null) {
              setOption(item as Option);
            }
          }}
          options={options}
          placeholder={label}
          isMultiple={isMultiple}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
