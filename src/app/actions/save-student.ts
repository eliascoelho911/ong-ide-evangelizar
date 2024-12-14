'use server';

import { StudentFullData } from "@/lib/types/student";
import { absoluteUrl } from "@/utils/absolute-url";
import { ActionResponse } from "./action-response";
import { getCryptedSession } from "@/lib/auth/session";

export async function saveStudent(id: string, data: StudentFullData["data"]): Promise<ActionResponse> {
    try {
        const session = await getCryptedSession()
        const response = await fetch(absoluteUrl(`api/student/data/${id}`), {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': `session=${session}`
             },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};