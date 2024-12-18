import { requireAuth } from "@/lib/auth/api";
import { updateStudentData } from "@/lib/firebase/firestore";

export async function PUT(req: Request, { params }: { params: Promise<{ studentId: string }> }) {
    return requireAuth(async () => {
        const studentId = (await params).studentId;
        const studentData = await req.json();

        try {
            await updateStudentData(studentId, studentData);
            return new Response(null, { status: 200 });
        } catch {
            return new Response(null, { status: 500 });
        }
    });
}
