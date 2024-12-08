'use client';

import FieldInput from "@/components/templates/form/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { SessionSchema } from "./schema";
import { Student } from "@/lib/types/student";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface FormProps {
  edit: boolean;
  schema: SessionSchema;
  student: Student;
}

export default function FormTemplate({ edit, schema, student }: FormProps) {
  const fields = schema.groups.flatMap((group) => group.fields)
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.id] = z.string({
        required_error: field.is_required ? `${field.name} é obrigatório` : undefined,
      })
      if (field.pattern) {
        acc[field.id] = acc[field.id].regex(new RegExp(field.pattern), { message: `${field.name} não é válido` })
      }
      return acc;
    }, {} as Record<string, z.ZodString>)
  ).partial().required(
    fields.reduce((acc, field) => {
      if (field.is_required) {
        acc[field.id] = true
      }
      return acc;
    }, {} as Record<string, true | undefined>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: student.data,
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // show alert
    alert("Form Data: " + JSON.stringify(values, null, 2));
    console.log("Form Data:", values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {schema.groups.map((group) => (
            <div key={group.id}>
              <h2 className="mt-8 mb-4 text-xl font-semibold">{group.name}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{field.name}</FormLabel>
                        <FieldInput field={field} onSelectChange={formField.onChange} {...formField} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
          <Button type="submit" className="btn">{edit ? "Salvar" : "Enviar"}</Button>
        </form>
      </Form>
    </div>
  );
}
