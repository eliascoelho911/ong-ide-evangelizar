import { Metadata } from "next";
import { StudentList } from "@/app/home/alunos/students";
import { ContentWithHeader } from "@/components/templates/header";
import { getLoggedUser } from "@/lib/data/user";
import { SearchForm } from "@/components/ui/search-form";
import { fetchAllStudents } from "@/data/students";

export const metadata: Metadata = {
  title: "Alunos | ONG Ide Evangelizar",
};

export default async function StudentsPage() {
  const students = await fetchAllStudents();
  const user = await getLoggedUser();

  return (
    <ContentWithHeader user={user} headerChildren={<SearchForm />}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <StudentList students={students} />
      </div>
    </ContentWithHeader>
  );
}
