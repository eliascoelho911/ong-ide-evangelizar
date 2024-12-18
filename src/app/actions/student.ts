'use server';

import { Student } from "@/lib/types/student";
import { updateStudentData as updateStudentDataOnFirebase, updateStudentDocuments as updateStudentDocumentsOnFirebase } from "@/data/students";

export async function updateStudent(id: string, data: Student["data"], documents: Student["documents"]) {
    try {
        const updateDataResponse = await updateStudentDataOnFirebase(id, data)

        if (!updateDataResponse.ok) {
            throw new Error(updateDataResponse.statusText);
        }

        const updateDocumentsResponse = await updateStudentDocumentsOnFirebase(id, documents)

        if (!updateDocumentsResponse.ok) {
            throw new Error(updateDocumentsResponse.statusText);
        }
    } catch (error) {
        console.debug('Failed to save student:', error);
        return { error: "Ocorreu um erro ao salvar os dados." };
    }
};