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
import { Download, Loader2 } from "lucide-react";
import formIsLoading from "@/utils/form-is-loading";

type Tab = {
  id: string;
  label: string;
  groups: Group[];
}

type TabbedFormContentProps = {
  tabs: Tab[];
  tabsWithErrors?: Set<string>;
  tabValidation?: (tab: Tab) => string | undefined;
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

function TabbedFormContent({ tabs, tabsWithErrors = new Set<string>(), tabValidation, children }: TabbedFormContentProps) {
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
        {tabValidation?.(tab) === undefined && <div className={`grid grid-cols-1 ${tab.groups.length > 1 ? 'sm:grid-cols-2' : ''} gap-4`}>
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
        </div> ||
          <div className="flex items-center justify-center h-48">
            <h1 className="text-lg text-muted-foreground">{tabValidation?.(tab)}</h1>
          </div>
        }
      </TabsContent>
    ))}
  </Tabs>)
}

export function TabbedForm({ schema, values }: TabbedFormProps) {
  const tabs = getTabs(schema);
  return (
    <div className="flex w-fit">
      <TabbedFormContent tabs={tabs} tabValidation={(tab) => {
        const hasOnlyEmptyFields = tab.groups.every(group => group.fields.every(field => !values[field.id]));
        if (hasOnlyEmptyFields) {
          if (tab.label === 'Documentos') {
            return 'Esse aluno não possui documentos cadastrados';
          } else {
            return `Esse aluno não possui ${tab.label.toLowerCase()} cadastrados`;
          }
        }
      }}>
        {(field) => (
          <div key={field.id} className="flex flex-col gap-y-2">
            <p className="text-sm font-medium leading-none">
              {field.name}
            </p>
            {field.type == 'file' && values[field.id] &&
              <a href={values[field.id]} download><Button><Download /> {`Baixar ${field.name}`}</Button></a> ||
              <p className="text-sm text-muted-foreground">
                {values[field.id] || 'Sem informação'}
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
  const defaultValues = {
    ...Object.fromEntries(
      fields.map(field => [field.id, ''])
    ),
    ...values
  }

  const zFormSchema = buildZodSchema(fields);
  const form = useForm<z.infer<typeof zFormSchema>>({
    defaultValues: defaultValues,
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
                    fileUrl={values[field.id]}
                    onFormChange={formField.onChange}
                    onAddressLoaded={(data) => Object.entries(data).forEach(([key, value]) => {
                      form.setValue(key, value)
                    })}
                    {...formField}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </TabbedFormContent>
        <Button type="submit" className="btn" disabled={formIsLoading(form.formState)}>
          {formIsLoading(form.formState) ? (<><Loader2 className="animate-spin" /> Salvando...</>) : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}

function getTabs(schema: FormSchema): Tab[] {
  return schema.sessions.map(session => ({
    id: session.id,
    label: session.name,
    groups: session.groups
  } as Tab))
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
        ).refine(
          (file: File) => {
            return file.type.startsWith("image/") || file.type === "application/pdf";
          },
          { message: 'Formato de arquivo não suportado' }
        ).nullish().catch(undefined);
      } else {
        let zodField = z.string({
          required_error: field.is_required ? `${field.name} é obrigatório` : undefined,
        });
        if (field.pattern) {
          zodField = zodField.regex(
            new RegExp(field.pattern),
            { message: `${field.name} não é válido` }
          );
        }
        acc[field.id] = zodField.refine((value: string) => {
          return !field.is_required || value.trim().length > 0;
        }, { message: `${field.name} é obrigatório` }).refine((value: string) => {
          if (field.id.includes('cpf')) {
            return isValidCPF(value);
          } else if (field.id.includes('rg')) {
            return isValidRG(value);
          } else {
            return true;
          }
        }, { message: `${field.name} não é válido` });
      }
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  ).partial().required(
    fields.reduce((acc, field) => {
      if (field.is_required) {
        acc[field.id] = true;
      }
      return acc;
    }, {} as Record<string, true | undefined>)
  );
}


const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');

  // CPF precisa ter 11 dígitos
  if (cleaned.length !== 11) return false;

  // Evita CPFs com todos os dígitos iguais (ex: 00000000000, 11111111111, etc)
  if (/^(\d)\1+$/.test(cleaned)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;

  return true;
};

// Função para validar RG
const isValidRG = (rg: string): boolean => {
  const cleaned = rg.replace(/\D/g, '');
  return cleaned.length >= 5 && cleaned.length <= 14;
};