import { fetchStudentById } from "@/lib/firebase/student";
import { requireAuth } from "@/lib/auth/api";

export async function GET(req: Request, { params }: { params: Promise<{ studentId: string }> }) {
    return requireAuth(async () => {
        const studentId = (await params).studentId;
        const studentData = await fetchStudentById(studentId);
        return new Response(JSON.stringify(studentData), { status: 200 });
    });
}