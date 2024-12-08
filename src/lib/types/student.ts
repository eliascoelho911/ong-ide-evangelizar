export type StudentSimpleData = {
    id: string
    name: string
    avatar?: string
}

export type Student = StudentSimpleData & {
    [field: string]: string | number | boolean
}