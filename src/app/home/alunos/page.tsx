import { Metadata } from "next";
import { StudentList } from "@/app/home/alunos/students";
import { ContentWithHeader } from "@/components/templates/header";
import { getLoggedUser } from "@/lib/data/user";
import { fetchAllStudents } from "@/data/students";
import { getAddStudentRoute } from "@/app/routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alunos | ONG Ide Evangelizar",
};

export default async function StudentsPage() {
  const students = await fetchAllStudents();
  const user = await getLoggedUser();

  return (
    <ContentWithHeader user={user} headerChildren={
      <div className="flex w-full justify-end items-end">
        <Link href={getAddStudentRoute()}>
          <Button variant="default">Adicionar Aluno</Button>
        </Link>
      </div>
    }>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <StudentList students={students} />
      </div>
    </ContentWithHeader>
  );
}
