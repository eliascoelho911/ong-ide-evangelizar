import { studentProfileFormSchema } from "@/data/student_profile_form_schema"
import { fetchStudentById } from "@/data/students"
import UserAvatar from "@/components/user-avatar"
import StudentForm from "./student-form-wrapper"
import { getBirthday, getFullName, getGuardians } from "@/lib/types/student"
import { ContentWithHeader } from "@/components/templates/header"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStudentRoute, getStudentsRoute } from "@/app/routes"
import { getStudentFileUrl } from "@/lib/firebase/storage"
import { getLoggedUser } from "@/lib/data/user"

export default async function StudentFormPage({
    studentId,
    edit,
}: {
    studentId: string,
    edit: boolean
}) {
    const student = await fetchStudentById(studentId)

    if (student === undefined && !edit) {
        return <div>Aluno não encontrado</div>
    }

    const user = await getLoggedUser();

    const fullName = student ? getFullName(student) : undefined;
    const birthday = student ? getBirthday(student) : undefined;
    const guardians = student ? getGuardians(student) : undefined;
    const status = student ? student.data?.additional_information_status : undefined;
    const studentDocumentsWithUrl = student ? Object.fromEntries(
        await Promise.all(
            Object.entries(student?.documents ?? {}).map(async ([key, path]) => {
                return [key, { path: path, url: await getStudentFileUrl(studentId, path) }]
            })
        )
    ) : undefined

    function EditButtons() {
        return (
            <Link href={getStudentRoute(studentId, !edit)}>
                <Button variant={edit ? "secondary" : "default"}>{edit ? "Cancelar" : "Editar"}</Button>
            </Link>
        )
    }

    return (
        <ContentWithHeader user={user} headerChildren={
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
                {student && <div className="flex flex-col items-center mb-4">
                    <UserAvatar
                        avatar={student.avatar}
                        fallback={fullName?.charAt(0)}
                        className="w-32 h-32" />
                    <h2 className="mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{fullName}</h2> 
                    {edit == false && birthday && <p className="text-sm text-muted-foreground">{birthday}</p>}
                    {edit == false && guardians && <p className="text-sm text-muted-foreground">de {guardians}</p>}
                    {edit == false && status && <p className="text-sm text-muted-foreground">Status: {status}</p>}
                </div> }

                <StudentForm
                    edit={edit}
                    schema={studentProfileFormSchema}
                    studentId={studentId}
                    studentData={student?.data}
                    studentDocuments={studentDocumentsWithUrl} />
            </div>
        </ContentWithHeader>
    )
}
