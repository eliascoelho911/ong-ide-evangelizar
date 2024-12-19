'use client'

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
import { Delete, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FieldInput({ field, fileUrl, onFormChange, ...props }: { field: Field, fileUrl: string, onFormChange?: (value: string | File | undefined) => void }) {
  const [showInputFile, setShowInputFile] = React.useState(fileUrl == undefined);

  return (
    <div>
      {field.type === "text" &&
        <FormControl><Input {...props} mask={field.pattern} /></FormControl>}
      {field.type === "select" && (
        <Select onValueChange={onFormChange} {...props}>
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
      {field.type === "file" && (
        <FormControl>
          <div className="flex items-center gap-2">
            {showInputFile && (
              <Input
                {...props}
                type="file"
                value={undefined}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onFormChange?.(file);
                  }
                }}
              />)}
            {fileUrl && !showInputFile && (
              <div className="flex items-center gap-2">
                <a href={fileUrl} download>
                  <Button variant="secondary">
                    <Download /> {`Baixar`}
                  </Button>
                </a>
                <Button variant="destructive" onClick={() => {
                  onFormChange?.(undefined)
                  setShowInputFile(true)
                }}>
                  <X /> {`Apagar`}
                </Button>
              </div>
            )}
          </div>
        </FormControl>
      )}
    </div>
  );
}