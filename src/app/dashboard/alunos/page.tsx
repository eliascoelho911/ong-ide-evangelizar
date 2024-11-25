import { Metadata } from "next";
import { StudentList } from "@/app/dashboard/alunos/students";

export const metadata: Metadata = {
  title: "Alunos | ONG Ide Evangelizar",
};

export default function StudentsPage() {
  const students = [
    {
      image: "https://via.placeholder.com/150",
      name: "Maria Clara Oliveira",
      age: 14,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "João Pedro Silva",
      age: 16,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Ana Beatriz Souza",
      age: 15,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Lucas Almeida Santos",
      age: 17,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <StudentList students={students} />
    </div>
  );
}
