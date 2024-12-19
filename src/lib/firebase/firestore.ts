import { getDoc, doc, setDoc, getDocs, collection, updateDoc, deleteField } from "firebase/firestore";
import { Student } from "../types/student";
import { db } from "./config";

export async function updateStudentData(studentId: string, studentData: Student["data"]) {
    const student = (await getDoc(doc(db, 'students', studentId))).data();
    const newStudent = {
        ...student,
        data: studentData
    };

    const docRef = doc(db, 'students', studentId);
    await setDoc(docRef, newStudent);
}

export async function updateStudentDocument(studentId: string, document: { id: string, path: string | null }) {
    const docRef = doc(db, 'students', studentId);
    await updateDoc(docRef, {
        [`documents.${document.id}`]: document.path === null ? deleteField() : document.path
    });
}

export async function fetchAllStudents() {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return students as Student[];
}

export async function fetchStudentById(studentId: string) {
    const docSnap = await getDoc(doc(db, 'students', studentId));
    return {
        id: docSnap.id,
        ...docSnap.data()
    } as Student;
}

