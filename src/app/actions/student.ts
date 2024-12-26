'use client';

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
    } | undefined,
    setUploadProgress: (progress: number) => void
) {
    try {
        const data: { [key: string]: string } = {};
        const removedDocuments: string[] = [];
        const files = Object.values(formValues).filter(value => value instanceof File).length;

        for (const [key, value] of Object.entries(formValues)) {
            if (value instanceof File) {
                await updateStudentDocument(studentId, { id: key, file: value }, (progress) => {
                    const relativeProgress = Math.round((progress / files) * 100);
                    setUploadProgress(relativeProgress);
                });
            } else if (value === null) {
                removedDocuments.push(key);
            } else if (value) {
                data[key] = value;
            }
        }

        if (studentDocuments) {
            for (const key of removedDocuments) {
                const path = studentDocuments[key].path;
                await deleteStudentDocument(studentId, { id: key, path: path });
            }
        }

        await updateStudentData(studentId, data);
    } catch (error) {
        console.error(error);
        return { error: "Ocorreu um erro ao atualizar o aluno." };
    }
};