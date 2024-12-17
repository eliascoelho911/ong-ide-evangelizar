import { doc, getDoc, setDoc } from "firebase/firestore";
import { StudentFullData } from "../types/student";
import { db } from "./firestore";

export async function updateStudentData(studentId: string, studentData: StudentFullData["data"]) {
    const student = (await getDoc(doc(db, 'students', studentId))).data();
    const newStudent = {
        ...student,
        data: studentData
    };

    const docRef = doc(db, 'students', studentId);
    await setDoc(docRef, newStudent);
}