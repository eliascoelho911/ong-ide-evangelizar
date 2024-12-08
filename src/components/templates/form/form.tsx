'use client';

import FormField from "@/components/templates/form/form-field";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { SessionSchema } from "./form-schema";

interface FormProps {
  edit: boolean;
  schema: SessionSchema;
}

function FormTemplate({ edit, schema }: FormProps) {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Lide com a submissão do formulário, por exemplo, enviar para uma API
  };
  const groups = schema.groups;

  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {groups.map((group, idx) => (
            <div key={idx} className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">{group.name}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.fields.map((field, index) => (
                  <FormField key={index} field={field} />
                ))}
              </div>
            </div>
          ))}
          {edit && (
            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          )}
        </form>
      </FormProvider>
    </main>
  );
}

export default FormTemplate;
