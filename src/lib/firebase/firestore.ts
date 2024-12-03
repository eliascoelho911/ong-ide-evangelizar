import { getFirestore } from "firebase-admin/firestore";
import { firebaseApp } from "./clientApp";

export const db = getFirestore(firebaseApp)