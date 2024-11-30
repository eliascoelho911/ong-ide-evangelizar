import { User, UserIdentification } from "@/types/user";

export function toUser(data: any): User {
    return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
    };
}

export function toUserIdentification(data: any): UserIdentification {
    return {
        id: data.id,
        email: data.email,
    };
}