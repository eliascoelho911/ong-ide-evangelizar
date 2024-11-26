'use client';

import FormField from "@/components/templates/form/form-field";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { Group } from "./form-schema";

interface FormProps {
  title: string;
  edit: boolean;
  content: Group[];
}

function FormTemplate({ title, edit, content }: FormProps) {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Lide com a submissão do formulário, por exemplo, enviar para uma API
  };

  return (
    <main>
      <h1 className="mb-6 text-2xl font-bold">{title}</h1> {/* TODO criar componente para reutilizar o título do Dashboard */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {content.map((group, idx) => (
            <div key={idx} className="mb-8">
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
