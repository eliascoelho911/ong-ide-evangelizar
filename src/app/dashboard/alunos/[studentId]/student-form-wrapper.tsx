'use client';

import { saveStudent } from "@/app/actions/student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { getStudentRoute } from "@/app/routes";
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
        if (response?.error) {
            alert(response.error);
            return;
        }

        router.push(getStudentRoute(studentId, false));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInvalidSubmit = (errors: { [key: string]: any }) => {
        console.debug("Erros no formulário:", errors);
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
