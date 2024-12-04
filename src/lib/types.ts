export type User = {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
}

export function getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`
}