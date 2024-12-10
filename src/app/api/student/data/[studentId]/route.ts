import { verifySession } from "@/lib/auth/api";
import { db } from "@/lib/firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function PUT(req: Request, { params }: { params: Promise<{ studentId: string }> }) {
    const session = await verifySession()

    if (session === null) {
        return new Response(null, { status: 401 });
    }

    const studentId = (await params).studentId
    const studentData = await req.json()
    const student = (await getDoc(doc(db, 'students', studentId))).data()
    const newStudent = {
        ...student,
        data: studentData
    }

    try {
        const docRef = doc(db, 'students', studentId);
        await setDoc(docRef, newStudent);
        return new Response(null, { status: 200 })
    } catch (error) {
        return new Response(null, { status: 500 });
    }
}