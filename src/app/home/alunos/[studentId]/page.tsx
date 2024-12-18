import { simpleStudentProfileFormSchema } from "@/data/student_profile_form_schema"
import { fetchStudentById } from "@/data/students"
import UserAvatar from "@/components/user-avatar"
import StudentForm from "./student-form-wrapper"
import { getBirthday, getFullName, getGuardians } from "@/lib/types/student"
import { ContentWithHeader } from "@/components/templates/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStudentRoute, getStudentsRoute } from "@/app/routes"

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ studentId: string }>
    searchParams: Promise<{ edit: string }>
}) {
    const studentId = (await params).studentId
    const student = await fetchStudentById(studentId)

    if (student === undefined) {
        return <div>Aluno não encontrado</div>
    }

    const fullName = getFullName(student)!
    const birthday = getBirthday(student)
    const guardians = getGuardians(student)

    const edit = (await searchParams).edit === "true"

    function EditButtons() {
        return (
            <Link href={getStudentRoute(studentId, !edit)}>
                <Button variant={edit ? "secondary" : "default"}>{edit ? "Cancelar" : "Editar"}</Button>
            </Link>
        )
    }

    return (
        <ContentWithHeader headerChildren={
            <div className="flex w-full justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={getStudentsRoute()}>Alunos</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{fullName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <EditButtons />
            </div>
        }>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4">
                    <UserAvatar
                        avatar={student.avatar}
                        fallback={fullName.charAt(0)}
                        className="w-32 h-32" />
                    <h2 className="mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{fullName}</h2>
                    {birthday && <p className="text-sm text-muted-foreground">{birthday}</p>}
                    {guardians && <p className="text-sm text-muted-foreground">de {guardians}</p>}
                </div>

                <StudentForm
                    edit={edit}
                    schema={simpleStudentProfileFormSchema}
                    values={student.data}
                    studentId={studentId} />
            </div>
        </ContentWithHeader>
    )
}
