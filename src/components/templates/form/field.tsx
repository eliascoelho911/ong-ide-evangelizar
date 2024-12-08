import * as React from "react";
import { Input } from "@/components/ui/input"; // Adjust the import path based on your project structure
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Field } from "./schema";
import { FormControl } from "@/components/ui/form";

export default function FieldInput({ field, onSelectChange, ...props }: { field: Field, onSelectChange?: (value: string) => void }) {
  return (
    <div>
      {field.type === "text" &&
        <FormControl><Input {...props} mask={field.pattern} /></FormControl>}
      {field.type === "select" && (
        <Select onValueChange={onSelectChange} {...props}>
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {field.type === "textarea" && <FormControl><Textarea {...props} /></FormControl>}
    </div>
  );
}