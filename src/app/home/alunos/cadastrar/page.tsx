import { Metadata } from "next";
import StudentFormPage from "../student-form-page"

export const metadata: Metadata = {
  title: "Novo Aluno | ONG Ide Evangelizar",
};

export default async function Page() {
    const studentId = crypto.randomUUID()

    return (StudentFormPage({ studentId, edit: true }))
}
