import { User, UserIdentification } from "@/types/user";
import * as NextAuth from "next-auth";

export function toUser(data: Record<string, any>): User {
    return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
    };
}

export function toUserIdentification(data: NextAuth.User): UserIdentification | null {
    return data.id && data.email ? {
        id: data.id,
        email: data.email,
    } : null;
}