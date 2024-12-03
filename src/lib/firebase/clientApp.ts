import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);