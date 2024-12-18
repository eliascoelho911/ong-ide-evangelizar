import { fetchWithAuth } from "@/lib/auth/fetch";
import { Student } from "@/lib/types/student";

export async function updateStudentData(id: string, data: Student["data"]) {
    return await fetchWithAuth(`api/student/data/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
         },
        body: JSON.stringify(data),
    });
}

export async function fetchAllStudents(): Promise<Student[]> {
    try {
        const result = await fetchWithAuth('api/students', {
            method: 'GET'
        });
        return Promise.resolve(await result.json() as Student[])
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function fetchStudentById(id: string) : Promise<Student> {
    try {
        const result = await fetchWithAuth(`api/student/${id}`, {
            method: 'GET'
        });
        return Promise.resolve(await result.json() as Student);
    } catch (error) {
        return Promise.reject(error);
    }
}