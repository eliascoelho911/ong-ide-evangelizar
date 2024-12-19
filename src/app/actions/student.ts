'use server';

import {
    deleteStudentDocument,
    updateStudentData,
    updateStudentDocument
} from "@/data/students";

export async function updateStudent(
    studentId: string,
    formValues: { [key: string]: string | File | null },
    studentDocuments: {
        [key: string]: {
            path: string;
            url: string;
        }
    },
    setUploadProgress: (progress: number) => void
) {
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
        console.error(error);
        return { error: "Ocorreu um erro ao atualizar o aluno." };
    }
};