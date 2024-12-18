'use server';

import { Student } from "@/lib/types/student";
import { updateStudentData as updateStudentDataOnFirebase } from "@/data/students";

export async function updateStudentData(id: string, data: Student["data"]) {
    try {
        const response = await updateStudentDataOnFirebase(id, data)

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.debug('Failed to save student:', error);
        return { error: "Ocorreu um erro ao salvar os dados." };
    }
};