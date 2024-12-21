'use client';

import { updateStudent } from "@/app/actions/student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Student } from "@/lib/types/student";
import { getStudentRoute } from "@/app/routes";

interface StudentFormProps {
    edit: boolean;
    schema: FormSchema;
    studentId: string,
    studentData: Student["data"];
    studentDocuments: {
        [key: string]: {
            path: string;
            url: string;
        }
    }
}

export default function StudentForm({
    edit,
    schema,
    studentId,
    studentData,
    studentDocuments
}: StudentFormProps) {
    const router = useRouter();
    const [uploadProgress, setUploadProgress] = useState(0);

    const onValidSubmit = async (formValues: { [key: string]: string | File | null }) => {
        const result = await updateStudent(studentId, formValues, studentDocuments, setUploadProgress);
        if (result?.error) {
            alert(result.error);
        } else {
            router.push(getStudentRoute(studentId, false));
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onInvalidSubmit = (errors: { [key: string]: any }) => {
        alert("Por favor, preencha todos os campos obrigatórios.");
    };

    const values = {
        ...studentData,
        ...Object.fromEntries(
            Object.entries(studentDocuments).map(([key, value]) => {
                return [key, value.url];
            })
        )
    };

    return (
        <div>
            {edit ? (
                <TabbedEditableForm
                    schema={schema}
                    values={values}
                    onValidSubmit={onValidSubmit}
                    onInvalidSubmit={onInvalidSubmit}
                />
            ) : (
                <TabbedForm schema={schema} values={values} />
            )}
        </div>
    );
}
