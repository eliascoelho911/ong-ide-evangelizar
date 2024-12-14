export type Student = {
    id: string;
    avatar?: string;
};

export type StudentSimpleData = Student & {
    name: string;
};

export type StudentFullData = Student & {
    data: { [key: string]: string };
};

export function getFullName(student: Student): string | undefined {
    if ((student as StudentSimpleData).name !== undefined) {
        return (student as StudentSimpleData).name;
    } else {
        return (student as StudentFullData).data?.personal_information_full_name;
    }
}

export function getBirthday(student: Student): string | undefined {
    return (student as StudentFullData).data?.personal_information_birthday;
}

export function getGuardians(student: Student): string | undefined {
    return (student as StudentFullData).data?.guardian_full_name;
}
