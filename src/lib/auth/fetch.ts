import { getCryptedSession } from "@/lib/auth/session"
import { absoluteUrl } from "@/utils/absolute-url"

export async function fetchWithAuth(
    input: string,
    init?: RequestInit
): Promise<Response> {
    const session = await getCryptedSession()

    return fetch(absoluteUrl(input), {
        ...init,
        headers: {
            ...init?.headers,
            Cookie: `session=${session}`
        }
    })
}