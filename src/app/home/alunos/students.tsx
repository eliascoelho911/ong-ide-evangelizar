'use client';

import { getStudentRoute } from "@/app/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBirthday, getFullName, Student } from "@/lib/types/student";
import { useRouter } from 'next/navigation';

const StudentCard: React.FC<{
  student: Student;
  onClick: () => void;
}> = ({ student, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex card items-center gap-4 rounded-xl bg-muted/50 p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:cursor-pointer"
    >
      <Avatar>
        {student?.avatar && <AvatarImage src={student.avatar} />}
        <AvatarFallback>{getFullName(student)?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-bold">{getFullName(student)}</h2>
        <p className="text-sm">{getBirthday(student)}</p>
      </div>
    </div>
  );
};

type StudentListProps = {
  students: Student[];
};

export const StudentList: React.FC<StudentListProps> = ({ students }) => {
  const router = useRouter();
  const handleStudentClick = (studentId: string) => {
    router.push(getStudentRoute(studentId));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {students.map((student, index) => (
        <StudentCard
          key={index}
          student={student}
          onClick={() => handleStudentClick(student.id)}
        />
      ))}
    </div>
  );
};
