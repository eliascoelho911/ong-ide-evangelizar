'use client';

import FieldInput from "@/components/templates/form/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Field, FormSchema } from "./schema";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FormProps {
  edit: boolean;
  schema: FormSchema;
  defaultValues: { [key: string]: string };
}

export default function FormTemplate({ edit, schema, defaultValues }: FormProps) {
  const fields = schema.sessions.flatMap(session => session.groups.flatMap(group => group.fields))
  const zFormSchema = buildZodSchema(fields)
  const form = useForm<z.infer<typeof zFormSchema>>({
    defaultValues: defaultValues,
    resolver: zodResolver(zFormSchema)
  });
  const tabs = schema.sessions.map(session => ({
    id: session.id,
    label: session.name,
    groups: session.groups
  }))
  const selectedTab = tabs[0].id

  function onSubmit(values: z.infer<typeof zFormSchema>) {
    // show alert
    alert("Form Data: " + JSON.stringify(values, null, 2));
    console.log("Form Data:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue={selectedTab}>
          <TabsList className={"grid w-full grid-cols-" + tabs.length}>
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.groups.map((group) => (
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
            </TabsContent>
          ))}
        </Tabs>
        <Button type="submit" className="btn">{edit ? "Salvar" : "Enviar"}</Button>
      </form>
    </Form>
  );
}

function buildZodSchema(fields: Field[]) {
  return z.object(
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
}