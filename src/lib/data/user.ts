import 'server-only'
import { User } from '@/lib/types/user'
import { db } from '../firebase/firestore'
import { doc, getDoc } from 'firebase/firestore';

export async function getUserDTO(userId: string): Promise<User> {
    return new Promise(async (resolve) => {
        const docSnap = await getDoc(doc(db, 'users', userId));
        const user = docSnap.data() as User
        resolve(user);
    });
}
