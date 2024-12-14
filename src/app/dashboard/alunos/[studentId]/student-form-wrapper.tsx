'use client';

import { saveStudent } from "@/app/actions/save-student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { getStudentRoute } from "@/utils/routes";
import { useRouter } from "next/navigation";

interface StudentFormProps {
    edit: boolean;
    schema: FormSchema;
    values: { [key: string]: string };
    studentId: string;
}

export default function StudentForm({
    edit,
    schema,
    values,
    studentId,
}: StudentFormProps) {
    const router = useRouter();

    const onValidSubmit = async (values: { [key: string]: string }) => {
        const response = await saveStudent(studentId, values);
        if (!response.success) {
            alert("Erro ao salvar aluno: " + response.error);
            return;
        }

        router.push(getStudentRoute(studentId, false));
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
                values={values}
                onValidSubmit={onValidSubmit}
                onInvalidSubmit={onInvalidSubmit}
            /> : <TabbedForm schema={schema} values={values} />
    );
}
