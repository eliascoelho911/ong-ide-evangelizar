export type User = {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    avatar?: string
}

export function getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`
}