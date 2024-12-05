import 'server-only'
import { StudentSimpleData } from '../types'
import { db } from '../firebase/firestore'
import { collection, getDocs } from 'firebase/firestore';

export async function getAllStudentsSimpleDataDTO(): Promise<StudentSimpleData[]> {
    return new Promise(async (resolve) => {
        const students: StudentSimpleData[] = []
        const querySnapshot = await getDocs(collection(db, 'students'));
        querySnapshot.forEach((doc) => {
            students.push(doc.data() as StudentSimpleData)
        });
        resolve(students);
    });
}