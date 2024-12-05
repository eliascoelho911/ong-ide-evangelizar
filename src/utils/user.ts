import { User } from "@/lib/types";

export function getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`
}