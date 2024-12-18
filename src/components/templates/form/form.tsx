'use client';

import { useMemo } from "react";
import FieldInput from "@/components/templates/form/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FormSchema, Group } from "./schema";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  groups: Group[];
}

type TabbedFormContentProps = {
  tabs: Tab[];
  tabsWithErrors?: Set<string>;
  children: (field: Field) => React.ReactNode;
};

type TabbedFormProps = {
  schema: FormSchema;
  values: { [key: string]: string };
}

type TabbedEditableFormProps = {
  schema: FormSchema;
  values: { [key: string]: string };
  onValidSubmit?: (values: { [key: string]: string | File }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInvalidSubmit?: (errors: { [key: string]: any }) => void;
}

export function TabbedFormContent({ tabs, tabsWithErrors = new Set<string>(), children }: TabbedFormContentProps) {
  const selectedTab = tabs[0].id;

  return (<Tabs defaultValue={selectedTab} className="w-full">
    <div className="flex justify-center">
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={tabsWithErrors.has(tab.id) ? 'text-red-500' : 'bg-muted'}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
    {tabs.map(tab => (
      <TabsContent key={tab.id} value={tab.id}>
        <div className={`grid grid-cols-1 ${tab.groups.length > 1 ? 'sm:grid-cols-2' : ''} gap-4`}>
          {tab.groups.map((group) => (
            <Card key={group.id} className="mt-8">
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                  {group.fields.map((field) => (
                    children(field)
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    ))}
  </Tabs>)
}

export function TabbedForm({ schema, values }: TabbedFormProps) {
  const tabs = getTabs(schema);
  return (
    <div className="flex w-fit">
      <TabbedFormContent tabs={tabs}>
        {(field) => (
          <div key={field.id} className="flex flex-col gap-y-2">
            <p className="text-sm font-medium leading-none">
              {field.name}
            </p>
            {field.type == 'file' &&
              <a href={values[field.id]} download><Button><Download /> {`Baixar ${field.name}`}</Button></a> ||
              <p className="text-sm text-muted-foreground">
                {values[field.id]}
              </p>}
          </div>
        )}
      </TabbedFormContent>
    </div>
  )
}

export function TabbedEditableForm({ schema, values, onValidSubmit, onInvalidSubmit }: TabbedEditableFormProps) {
  const fields = schema.sessions.flatMap(session =>
    session.groups.flatMap(group => group.fields)
  );

  const zFormSchema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof zFormSchema>>({
    defaultValues: values,
    resolver: zodResolver(zFormSchema)
  });
  const tabs = getTabs(schema);
  const tabsWithErrors = useMemo(() => {
    const errorFields = Object.keys(form.formState.errors);
    const errorTabs = new Set<string>();

    tabs.forEach(tab => {
      tab.groups.forEach(group => {
        group.fields.forEach(field => {
          if (errorFields.includes(field.id)) {
            errorTabs.add(tab.id);
          }
        });
      });
    });

    return errorTabs;
  }, [form.formState.errors, tabs]);

  function onValid(values: z.infer<typeof zFormSchema>) {
    if (onValidSubmit) {
      onValidSubmit(values);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onInvalid(errors: { [key: string]: any }) {
    if (onInvalidSubmit) {
      onInvalidSubmit(errors);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid, onInvalid)} className="space-y-8">
        <TabbedFormContent tabs={tabs} tabsWithErrors={tabsWithErrors}>
          {(field) => (
            <FormField
              key={field.id}
              name={field.id}
              control={form.control}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FieldInput
                    field={field}
                    onFormChange={formField.onChange}
                    {...formField}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </TabbedFormContent>
        <Button type="submit" className="btn">Salvar</Button>
      </form>
    </Form>
  );
}

function getTabs(schema: FormSchema) {
  return schema.sessions.map(session => ({
    id: session.id,
    label: session.name,
    groups: session.groups
  } as Tab));
}

function buildZodSchema(fields: Field[]) {
  return z.object(
    fields.reduce((acc, field) => {
      if (field.type === 'file') {
        acc[field.id] = z.instanceof(File, {
          message: `${field.name} é obrigatório`
        }).refine(
          (file: File) => {
            return file.size < 1024 * 1024 * 4
          },
          { message: 'O arquivo deve ter no máximo 4MB' }
        );
      } else {
        const zodField = z.string({
          required_error: field.is_required ? `${field.name} é obrigatório` : undefined,
        });
        acc[field.id] = zodField
        if (field.pattern) {
          acc[field.id] = zodField.regex(
            new RegExp(field.pattern),
            { message: `${field.name} não é válido` }
          );
        }
      }
      return acc;
    }, {} as Record<string, z.ZodString | z.ZodType<File>>)
  ).partial().required(
    fields.reduce((acc, field) => {
      if (field.is_required) {
        acc[field.id] = true;
      }
      return acc;
    }, {} as Record<string, true | undefined>)
  );
}
