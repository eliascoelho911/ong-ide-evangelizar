import { requireAuth } from "@/lib/auth/api";
import { fetchWithAuth } from "@/lib/auth/fetch";
import { updateStudentData } from "@/lib/firebase/student";
import { StudentFullData } from "@/lib/types/student";

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

export async function performStudentDataUpdate(id: string, data: StudentFullData["data"]) {
    return await fetchWithAuth(`api/student/data/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
         },
        body: JSON.stringify(data),
    });
}