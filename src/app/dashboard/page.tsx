import { getUser } from "@/lib/session/dal";

export default async function Page() {
  const user = await getUser();

  return (
    <h1 className="m-4 text-2xl font-bold">Nome: {user?.userId}</h1>
  )
}
