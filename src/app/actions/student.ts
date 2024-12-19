'use server';

import { Student } from "@/lib/types/student";
import { updateStudentData as _updateStudentData } from "@/data/students";

export async function updateStudentData(id: string, data: Student["data"]) {
    try {
        await _updateStudentData(id, data)
    } catch (error) {
        console.debug('Failed to save student:', error);
        return { error: "Ocorreu um erro ao salvar os dados." };
    }
};