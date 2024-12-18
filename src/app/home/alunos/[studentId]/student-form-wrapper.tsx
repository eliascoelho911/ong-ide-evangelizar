'use client';

import { updateStudentData } from "@/app/actions/student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { getStudentRoute } from "@/app/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadStudentFile } from "@/lib/firebase/storage";

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
    const [uploadProgress, setUploadProgress] = useState(0);

    const onValidSubmit = async (formValues: { [key: string]: string | File }) => {
        const updatedValues: { [key: string]: string } = {};

        for (const [key, value] of Object.entries(formValues)) {
            if (value instanceof File) {
                try {
                    const fileExtension = value.name.split('.').pop();
                    const fileName = `${key}.${fileExtension}`
                    const file = new File([value], fileName);
                    await uploadStudentFile(studentId, file, (progress) => {
                        setUploadProgress(progress);
                    });
                    updatedValues[key] = fileName; 
                } catch (error) {
                    alert(`Erro ao fazer upload do arquivo ${key}: ${error}`);
                    return;
                }
            } else {
                updatedValues[key] = value;
            }
        }

        const response = await updateStudentData(studentId, updatedValues);
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
        <div>
            {uploadProgress > 0 && (
                <div>
                    <p>Progresso do Upload: {uploadProgress}%</p>
                    <progress value={uploadProgress} max="100" />
                </div>
            )}
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
