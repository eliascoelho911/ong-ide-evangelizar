import FormTemplate from "@/components/templates/form/form"
import { SessionSchema } from "@/components/templates/form/schema"
import { studentProfileFormSchema } from "@/data/student_profile_form_schema"
import { getStudentFullDataDTO } from "@/lib/data/student"

export default async function Page({
    params,
}: {
    params: Promise<{ studentId: string }>
}) {
    const studentId = (await params).studentId
    const student = await getStudentFullDataDTO(studentId)

    if (student === null) {
        return <div>Aluno não encontrado</div> 
    }

    return (
        <FormTemplate edit={true} schema={studentProfileFormSchema} defaultValues={student.data} />)
}

function getSession(id: string): SessionSchema {
    return studentProfileFormSchema.sessions.find(session => session.id === id)!
}