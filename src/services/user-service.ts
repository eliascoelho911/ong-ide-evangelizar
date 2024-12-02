import { User, UserIdentification } from "@/types/user";
import * as Firebase from "@/lib/firebase";
import { toUser, toUserIdentification } from "@/utils/firebase-mappers";

/**
 * Faz login de um usuário no Firebase Auth.
 * @param email Email do usuário
 * @param password Senha do usuário
 * @returns Dados do usuário autenticado
 */
export async function loginUser(email: string, password: string): Promise<UserIdentification> {
  const userCredential = await Firebase.signIn(email, password);
  return toUser(userCredential.user);
}

/**
 * Salva os dados do usuário no Firestore.
 * @param userId ID do usuário
 * @param userData Dados adicionais do usuário
 */
export async function saveUserData(userId: string, userData: Record<string, any>) {
  await Firebase.saveDocument("users", userId, userData);
}

/**
 * Busca os dados do usuário no Firestore.
 * @param userId ID do usuário
 * @returns Dados do usuário ou null
 */
export async function getUserData(userId: string): Promise<User> {
  return await toUser(Firebase.getDocument("users", userId));
}

/**
 * Busca os dados do usuário autenticado.
 * @returns Dados do usuário autenticado
 */
export async function getLoggedUserData(): Promise<User> {
  return getUserData((await getLoggedUser()).id);
}

/**
 * Busca o ID do usuário autenticado.
 *
 * @returns {Promise<string>} O ID do usuário autenticado.
 * @throws {Error} Se o usuário não estiver autenticado.
 */
export async function getLoggedUser(): Promise<UserIdentification> {
  console.log("getLoggedUser");
  const user = toUserIdentification(await Firebase.getLoggedUser());

  if (!user) {
    throw new Error("Os dados do usuário não foram encontrados.");
  }

  return user;
}
