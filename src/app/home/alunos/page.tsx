import { Metadata } from "next";
import { StudentList } from "@/app/home/alunos/students";
import { ContentWithHeader } from "@/components/templates/header";
import { getLoggedUser } from "@/lib/data/logged-user";
import { SearchForm } from "@/components/ui/search-form";
import { getAllStudentsSimpleDataDTO } from "@/lib/data/student";

export const metadata: Metadata = {
  title: "Alunos | ONG Ide Evangelizar",
};

export default async function StudentsPage() {
  const students = await getAllStudentsSimpleDataDTO();
  const user = await getLoggedUser();

  return (
    <ContentWithHeader user={user} headerChildren={<SearchForm />}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <StudentList students={students} />
      </div>
    </ContentWithHeader>
  );
}
