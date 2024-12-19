'use client';

import { updateStudent } from "@/app/actions/student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { getStudentRoute } from "@/app/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeStudentFile, uploadStudentFile } from "@/lib/firebase/storage";
import { Student } from "@/lib/types/student";

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
        console.log("formValues", formValues);
        
        const data: { [key: string]: string } = {};
        const documents: { [key: string]: string } = {};
        const removedDocuments: string[] = [];

        for (const [key, value] of Object.entries(formValues)) {
            if (value instanceof File) {
                try {
                    const fileExtension = value.name.split('.').pop();
                    const fileName = `${key}.${fileExtension}`
                    const file = new File([value], fileName);
                    await uploadStudentFile(studentId, file, (progress) => {
                        setUploadProgress(progress);
                    });
                    documents[key] = fileName;
                } catch (error) {
                    alert(`Erro ao fazer upload do arquivo ${key}: ${error}`);
                    return;
                }
            } else if (value === null) {
                removedDocuments.push(key);
            } else {
                data[key] = value;
            }
        }

        console.log("studentDocuments", studentDocuments);
        console.log("documents", documents);
        console.log("removedDocuments", removedDocuments);

        for (const key of removedDocuments) {
            const path = studentDocuments[key].path;
            await removeStudentFile(studentId, path);
        }

        const response = await updateStudent(studentId, data, documents);
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
