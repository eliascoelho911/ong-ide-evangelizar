import StudentFormPage from "../student-form-page"

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ studentId: string }>
    searchParams: Promise<{ edit: string }>
}) {
    const studentId = (await params).studentId

    const edit = (await searchParams).edit === "true"

    return (StudentFormPage({ studentId, edit }))
}
