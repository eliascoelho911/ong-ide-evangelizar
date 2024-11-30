export interface UserIdentification {
    id: string;
    email: string;
}

export interface User {
    id: string;
    email: string;
    name?: string; 
    avatarUrl?: string; 
}