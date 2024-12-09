import 'server-only'
import { Student, StudentSimpleData } from '@/lib/types/student'
import { db } from '../firebase/firestore'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function getAllStudentsSimpleDataDTO(): Promise<StudentSimpleData[]> {
    return new Promise(async (resolve) => {
        const students: StudentSimpleData[] = []
        const querySnapshot = await getDocs(collection(db, 'students'));
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            const student = {
                id: doc.id,
                name: data.data.personal_information_full_name as string,
                avatar: data.avatar as string
            }
            students.push(student)
        });
        resolve(students);
    });
}

export async function getStudentFullDataDTO(studentId: string): Promise<Student | null> {
    return new Promise(async (resolve) => {
        const docSnap = await getDoc(doc(db, 'students', studentId));
        const docData = docSnap.data();

        if (docData) {
            const data = docData.data;
            const student = {
                id: docSnap.id,
                name: data.personal_information_full_name as string,
                avatar: docData.avatar as string,
                data: data
            }
            resolve(student);
        } else {
            resolve(null);
        }
    });
}