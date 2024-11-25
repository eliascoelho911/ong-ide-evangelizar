'use client';

import Image from "next/image";

type StudentProps = {
  image: string;
  name: string;
  age: number;
  onClick?: () => void;
};

const StudentCard: React.FC<StudentProps> = ({ image, name, age, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex card items-center gap-4 rounded-xl bg-muted/50 p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:cursor-pointer"
    >
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="h-24 w-24 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-muted-foreground">Idade: {age}</p>
      </div>
    </div>
  );
};

type StudentListProps = {
  students: StudentProps[];
};

export const StudentList: React.FC<StudentListProps> = ({ students }) => {
  const handleStudentClick = (studentName: string) => {
    alert(`Aluno selecionado: ${studentName}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {students.map((student, index) => (
        <StudentCard
          key={index}
          image={student.image}
          name={student.name}
          age={student.age}
          onClick={() => handleStudentClick(student.name)}
        />
      ))}
    </div>
  );
};
