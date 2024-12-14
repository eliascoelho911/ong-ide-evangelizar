export function absoluteUrl(path: string, baseUrl?: string): string {
    const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL;

    if (!base) {
        throw new Error('The base URL is required to create an absolute URL');
    }

    try {
        return new URL(path, base).toString();
    } catch (error) {
        throw new Error(`Failed to create an absolute URL: ${error}`);
    }
}