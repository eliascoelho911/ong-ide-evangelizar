import { requireAuth } from "@/lib/auth/api";
import { updateStudentDocuments } from "@/lib/firebase/firestore";

export async function PUT(req: Request, { params }: { params: Promise<{ studentId: string }> }) {
    return requireAuth(async () => {
        const studentId = (await params).studentId;
        const studentDocuments = await req.json();

        try {
            await updateStudentDocuments(studentId, studentDocuments);
            return new Response(null, { status: 200 });
        } catch {
            return new Response(null, { status: 500 });
        }
    });
}
