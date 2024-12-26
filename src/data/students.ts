import { uploadStudentFile as _uploadStudentFile, deleteStudentFile as _deteleStudentFile } from "@/lib/firebase/storage";
import {
    updateStudentDocument as _updateStudentDocument,
    updateStudentData as _updateStudentData,
    fetchStudentById as _fetchStudentById,
    fetchAllStudents as _fetchAllStudents
} from "@/lib/firebase/firestore";
import { Student } from "@/lib/types/student";

export async function updateStudentData(id: string, data: Student["data"]) {
    await _updateStudentData(id, data);
}

export async function updateStudentDocument(
    studentId: string,
    document: { id: string, file: File },
    onProgress: (progress: number) => void
) {
    const fileExtension = document.file.name.split('.').pop();
    const fileName = `${document.id}.${fileExtension}`
    const file = new File([document.file], fileName);

    await _uploadStudentFile(studentId, file, onProgress);
    await _updateStudentDocument(studentId, { id: document.id, path: fileName });
}

export async function deleteStudentDocument(studentId: string, document: { id: string, path: string }) {
    await _deteleStudentFile(studentId, document.path);
    await _updateStudentDocument(studentId, { id: document.id, path: null });
}

export async function fetchAllStudents(): Promise<Student[]> {
    return await _fetchAllStudents();
}

export async function fetchStudentById(id: string): Promise<Student | undefined> {
    return await _fetchStudentById(id);
}