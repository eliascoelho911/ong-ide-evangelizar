export function getStudentRoute(studentId: string, edit: boolean = false): string {
    return `/dashboard/alunos/${studentId}?edit=${edit}`;
}

export function getStudentsRoute(): string {
    return "/dashboard/alunos";
}

export function getHomeRoute(): string {
    return "/";
}

export function getLoginRoute(): string {
    return "/login";
}