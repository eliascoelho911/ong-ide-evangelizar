'use server';

import { StudentFullData } from "@/lib/types/student";
import { performStudentDataUpdate } from "../api/student/data/[studentId]/route";

export async function saveStudent(id: string, data: StudentFullData["data"]) {
    try {
        const response = await performStudentDataUpdate(id, data)

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.debug('Failed to save student:', error);
        return { error: "Ocorreu um erro ao salvar os dados." };
    }
};