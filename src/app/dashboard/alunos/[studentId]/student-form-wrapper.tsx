'use client';

import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";

interface StudentFormProps {
    edit: boolean;
    schema: FormSchema;
    defaultValues: { [key: string]: string };
    studentId: string;
}

export default function StudentForm({
    edit,
    schema,
    defaultValues,
    studentId,
}: StudentFormProps) {

    const onValidSubmit = async (values: { [key: string]: string }) => {
        const student = {
            id: studentId,
            name: values.personal_information_full_name,
            data: values
        };
        
        try {
            const response = await fetch(`/api/student/data/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student.data),
            });

            if (!response.ok) {
                throw new Error('Falha ao salvar o aluno');
            }

            alert('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            alert('Erro ao salvar os dados. Tente novamente.');
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInvalidSubmit = (errors: { [key: string]: any }) => {
        console.log("Erros no formulário:", errors);
        alert("Por favor, corrija os erros antes de enviar.");
    };

    return (
        edit ?
        <TabbedEditableForm
            schema={schema}
            defaultValues={defaultValues}
            onValidSubmit={onValidSubmit}
            onInvalidSubmit={onInvalidSubmit}
        /> : <TabbedForm schema={schema} />
    );
}
