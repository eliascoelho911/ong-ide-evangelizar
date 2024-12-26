export function getHomeRoute(): string {
    return "/home";
}

export function getStudentsRoute(): string {
    return `${getHomeRoute()}/alunos`;
}

export function getAddStudentRoute(): string {
    return `${getStudentsRoute()}/cadastrar`;
}

export function getStudentRoute(studentId: string, edit: boolean = false): string {
    return `${getStudentsRoute()}/${studentId}?edit=${edit}`;
}

export function getLoginRoute(): string {
    return "/login";
}