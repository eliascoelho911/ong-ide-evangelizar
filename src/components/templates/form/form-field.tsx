import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Adjust the import path based on your project structure
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./form-schema";

interface FieldProps {
  field: Field
}

const FormField: React.FC<FieldProps> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();

  const commonProps = {
    id: field.id,
    placeholder: field.name,
    disabled: field.editable === false,
    defaultValue: field.value, // Add defaultValue here
    ...register(field.name, {
      required: field.is_required ? `${field.name} é obrigatório` : false,
      pattern: field.pattern ? new RegExp(field.pattern) : undefined,
    }),
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {field.name}
      </label>
      {field.type === "text" && <Input mask={field.pattern} {...commonProps} />}
      {field.type === "select" && (
        <Select {...commonProps}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {field.type === "textarea" && <Textarea {...commonProps} />}
      {errors[field.name] && (
        <p className="mt-2 text-sm text-red-600">{errors[field.name]?.message as string}</p>
      )}
    </div>
  );
};

export default FormField;