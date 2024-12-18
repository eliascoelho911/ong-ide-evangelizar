import 'server-only'
import { User } from '@/lib/types/user'
import { db } from '../firebase/firestore'
import { doc, getDoc } from 'firebase/firestore';
import { getLoggedUserId } from '../auth/api';

export async function getUserDTO(userId: string): Promise<User> {
    return new Promise(async (resolve) => {
        const docSnap = await getDoc(doc(db, 'users', userId));
        const user = docSnap.data() as User
        resolve(user);
    });
}

export async function getLoggedUser(): Promise<User | undefined> {
    const userId = await getLoggedUserId()
    if (!userId) return undefined

    return getUserDTO(userId)
}