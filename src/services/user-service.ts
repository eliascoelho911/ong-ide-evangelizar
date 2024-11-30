import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, signIn } from "@/lib/firebase"; // Importando a instância do Firebase inicializada
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth.config";

/**
 * Faz login de um usuário no Firebase Auth.
 * @param email Email do usuário
 * @param password Senha do usuário
 * @returns Dados do usuário autenticado
 */
export async function loginUser(email: string, password: string): Promise<User> {
  const userCredential = await signIn(email, password);
  return userCredential.user;
}

/**
 * Cria ou atualiza os dados do usuário no Firestore.
 * @param userId ID único do usuário (geralmente vindo do Firebase Auth)
 * @param userData Dados adicionais do usuário
 * @returns Confirmação da escrita no Firestore
 */
export async function saveUserData(userId: string, userData: Record<string, any>): Promise<void> {
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, userData, { merge: true });
}

/**
 * Busca os dados do usuário no Firestore.
 * @param userId ID único do usuário
 * @returns Dados do usuário armazenados no Firestore
 */
export async function getUserData(userId: string): Promise<Record<string, any> | null> {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
}

/**
 * Busca os dados do usuário autenticado.
 * @returns Dados do usuário autenticado
 */
export async function getLoggedUserData() {
  const userId = await getUserId();
  return getUserData(userId);
}

/**
 * Obtém o ID do usuário autenticado a partir da sessão do servidor.
 *
 * @returns {Promise<string>} O ID do usuário autenticado.
 * @throws {Error} Se o usuário não estiver autenticado.
 */
export async function getUserId() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  return session.user.id;
}
