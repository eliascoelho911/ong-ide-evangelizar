'use client';

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
export const storage = getStorage(firebaseApp);