import { AppSidebar } from "@/app/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getUser } from "@/lib/session/dal";

export default async function Page() {
  const user = await getUser();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <h1 className="m-4 text-2xl font-bold">Nome: {user?.displayName}</h1>
      </SidebarInset>
    </SidebarProvider>
  )
}
