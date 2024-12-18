import { fetchAllStudents as fetchAllStudentsFromFirebase } from "@/lib/firebase/firestore";
import { requireAuth } from "@/lib/auth/api";

export async function GET() {
    return requireAuth(async () => {
        const students = await fetchAllStudentsFromFirebase()

        return new Response(JSON.stringify(students), { status: 200 });
    });
}