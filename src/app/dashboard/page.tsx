import { getLoggedUser } from "@/lib/data/logged-user";

export default async function Page() {
  const user = await getLoggedUser();

  return (
    <h1 className="m-4 text-2xl font-bold">Nome: {user?.firstName}</h1>
  )
}
