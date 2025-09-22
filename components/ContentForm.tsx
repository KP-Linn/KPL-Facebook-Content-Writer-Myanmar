
import React from 'react';
import type { FormData, Option } from '../types';
import { TONES, FORMATS, AUDIENCES } from '../constants';
import { SparklesIcon } from './IconComponents';

interface ContentFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const SelectInput: React.FC<{
  label: string;
  labelMy: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  name: keyof FormData;
}> = ({ label, labelMy, value, onChange, options, name }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-300">
      {label} <span className="text-slate-400">/ {labelMy}</span>
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base bg-slate-800/60 border-slate-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label} / {option.labelMy}
        </option>
      ))}
    </select>
  </div>
);

export const ContentForm: React.FC<ContentFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700/80 shadow-2xl shadow-slate-950/30">
      <h2 className="text-2xl font-bold text-slate-200">Content Details</h2>
      <p className="text-slate-400 mt-1">အကြောင်းအရာအသေးစိတ်</p>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="mt-6 space-y-6"
      >
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-300">
            Topic <span className="text-slate-400">/ အကြောင်းအရာ</span>
          </label>
          <textarea
            id="topic"
            name="topic"
            rows={4}
            value={formData.topic}
            onChange={handleInputChange}
            placeholder="e.g., a new coffee shop opening in Yangon..."
            className="mt-1 block w-full text-base bg-slate-800/60 border-slate-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 rounded-md transition-all duration-200 placeholder:text-slate-500 p-3"
            required
          />
        </div>

        <SelectInput
          label="Tone of Voice"
          labelMy="အသံနေအသံထား"
          name="tone"
          value={formData.tone}
          onChange={handleInputChange}
          options={TONES}
        />
        <SelectInput
          label="Content Format"
          labelMy="ပုံစံ"
          name="format"
          value={formData.format}
          onChange={handleInputChange}
          options={FORMATS}
        />
        <SelectInput
          label="Target Audience"
          labelMy="ပစ်မှတ်ပရိသတ်"
          name="audience"
          value={formData.audience}
          onChange={handleInputChange}
          options={AUDIENCES}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              Generate Content
            </>
          )}
        </button>
      </form>
    </div>
  );
};
