import FormTemplate from "@/components/templates/form/form"
import { SessionSchema } from "@/components/templates/form/schema"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

    const tabs = studentProfileFormSchema.sessions.map(session => ({
        id: session.id,
        label: session.name
    }))
    const selectedTab = tabs[0].id

    return (
        <div>
            <Tabs defaultValue={selectedTab}>
                <TabsList className={"grid w-full grid-cols-" + tabs.length}>
                    {tabs.map(tab => (
                        <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
                    ))}
                </TabsList>
                {tabs.map(tab => (
                    <TabsContent key={tab.id} value={tab.id}>
                        <FormTemplate edit={true} schema={getSession(tab.id)} student={student} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>)
}

function getSession(id: string): SessionSchema {
    return studentProfileFormSchema.sessions.find(session => session.id === id)!
}