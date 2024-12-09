import { getLoggedUserId } from "../auth/api";
import { User } from "@/lib/types/user";
import { getUserDTO } from "./user";

export async function getLoggedUser(): Promise<User | undefined> {
    const userId = await getLoggedUserId()
    if (!userId) return undefined

    return getUserDTO(userId)
}