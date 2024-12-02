import "server-only";

import { headers } from "next/headers";
import { FirebaseServerApp, initializeServerApp } from "firebase/app";

import { firebaseConfig } from "./config";
import { getAuth, User } from "firebase/auth";

export async function getAuthenticatedAppForUser(): Promise<{ firebaseServerApp: FirebaseServerApp; currentUser: User | null }> {
  const idToken = (await headers()).get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {}
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}