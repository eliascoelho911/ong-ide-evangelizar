'use client';

import React from "react";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { studentProfileDataSchema } from "./student_profile_data_schema";
import { usePathname } from "next/navigation";

interface StudentProfileLayoutProps {
  children: ReactNode;
}

const StudentProfileLayout: React.FC<StudentProfileLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const categoryId = pathParts[pathParts.length - 1];

  const nav = studentProfileDataSchema.categories.map((cat) => ({
    title: cat.name,
    path: cat.id,
    icon: null,
  }));

  return (
    <SidebarProvider>
      <AppSidebar currentPath={categoryId} nav={nav} />
      <main>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default StudentProfileLayout;
