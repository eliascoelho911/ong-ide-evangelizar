'use server'

import { deleteSession } from "@/lib/auth/session";
import { absoluteUrl } from "@/utils/absolute-url";
import { redirect } from "next/navigation";
import { signOut as _signOut } from "@/lib/firebase/auth";
import { getLoginRoute } from "../routes";

export async function signOut() {
    await _signOut();
    await deleteSession();

    redirect(absoluteUrl(getLoginRoute()));
}