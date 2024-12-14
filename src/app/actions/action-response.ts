export type ActionResponse = {
    success: boolean;
    error?: string;
    data?: { [key: string]: any };
};