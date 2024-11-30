import { User } from "firebase/auth";
import { signIn, saveDocument, getDocument } from "@/lib/firebase"; // Importando a instância do Firebase inicializada
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
 * Salva os dados do usuário no Firestore.
 * @param userId ID do usuário
 * @param userData Dados adicionais do usuário
 */
export async function saveUserData(userId: string, userData: Record<string, any>) {
  await saveDocument("users", userId, userData);
}

/**
 * Busca os dados do usuário no Firestore.
 * @param userId ID do usuário
 * @returns Dados do usuário ou null
 */
export async function getUserData(userId: string): Promise<Record<string, any> | null> {
  return await getDocument("users", userId);
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
