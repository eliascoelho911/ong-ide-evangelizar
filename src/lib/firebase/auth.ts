import {
    signInWithEmailAndPassword as _signInWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

export function signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return _signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}