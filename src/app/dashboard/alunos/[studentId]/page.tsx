import FormTemplate from "@/components/templates/form/form"
import { studentProfileFormSchema } from "@/data/student_profile_form_schema"
import { getStudentFullDataDTO } from "@/lib/data/student"
import UserAvatar from "@/components/user-avatar"

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="mb-4">
                <UserAvatar
                    avatar={student.avatar}
                    fallback={student.name.charAt(0)}
                    style={{ width: '128px', height: '128px' }} />
                <h2 className="mt-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{student.name}</h2>
                <p className="text-sm text-muted-foreground">{student.data.personal_information_birthday}</p>
                {student.data.guardian_full_name && <p className="text-sm text-muted-foreground">de {student.data.guardian_full_name}</p>}
            </div>

            <FormTemplate
                edit={true}
                schema={studentProfileFormSchema}
                defaultValues={student.data} />
        </div>
    )
}