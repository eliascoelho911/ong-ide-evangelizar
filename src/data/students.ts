import { fetchWithAuth } from "@/lib/auth/fetch";
import { getStudentFileUrl } from "@/lib/firebase/storage";
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

export async function updateStudentDocuments(id: string, documents: Student["documents"]) {
    return await fetchWithAuth(`api/student/documents/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(documents),
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

export async function fetchStudentById(id: string): Promise<Student> {
    try {
        const result = await fetchWithAuth(`api/student/${id}`, {
            method: 'GET'
        });
        const student = await result.json() as Student;
        const documentsEntries = await Promise.all(
            Object.entries(student.documents).map(async ([key, value]) => {
                return [key, await getStudentFileUrl(student.id, value)];
            })
        );
        student.documents = Object.fromEntries(documentsEntries);
        return Promise.resolve(student);
    } catch (error) {
        return Promise.reject(error);
    }
}