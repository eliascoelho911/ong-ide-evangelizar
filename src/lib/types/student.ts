export type Student = {
    id: string;
    avatar?: string;
    data: { [key: string]: string };
    documents: { [key: string]: string };
};

export function getFullName(student: Student): string | undefined {
    return student.data?.personal_information_full_name;
}

export function getBirthday(student: Student): string | undefined {
    return student.data?.personal_information_birthday;
}

export function getGuardians(student: Student): string | undefined {
    return student.data?.personal_information_guardians;
}
