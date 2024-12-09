export type StudentSimpleData = {
    id: string
    name: string
    avatar?: string
}

export type Student = StudentSimpleData & {
    data: { [field: string]: any }
}