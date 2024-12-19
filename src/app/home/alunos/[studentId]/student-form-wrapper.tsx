'use client';

import { updateStudentData } from "@/app/actions/student";
import { TabbedEditableForm, TabbedForm } from "@/components/templates/form/form";
import { FormSchema } from "@/components/templates/form/schema";
import { getStudentRoute } from "@/app/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Student } from "@/lib/types/student";
import { deleteStudentDocument, updateStudentDocument } from "@/data/students";

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
        try {
            const data: { [key: string]: string } = {};
            const removedDocuments: string[] = [];

            for (const [key, value] of Object.entries(formValues)) {
                if (value instanceof File) {
                    await updateStudentDocument(studentId, { id: key, file: value }, setUploadProgress);
                } else if (value === null) {
                    removedDocuments.push(key);
                } else {
                    data[key] = value;
                }
            }

            for (const key of removedDocuments) {
                const path = studentDocuments[key].path;
                await deleteStudentDocument(studentId, { id: key, path: path });
            }

            await updateStudentData(studentId, data);
        } catch (error) {
            alert("Ocorreu um erro ao salvar os dados.");
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
