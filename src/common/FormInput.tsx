import { type FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  register: any;
  error?: FieldError;
}

export default function FormInput({
  label,
  id,
  type,
  autoComplete,
  required = false,
  register,
  error,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}