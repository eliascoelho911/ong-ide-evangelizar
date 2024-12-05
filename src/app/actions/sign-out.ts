'use server'

import { deleteSession } from "@/lib/auth/session";
import { createAbsoluteUrl } from "@/utils/absolute-url";
import { NextResponse } from "next/server";
import { signOut as _signOut } from "@/lib/firebase/auth";

export async function signOut() {
    await _signOut();
    await deleteSession();

    return NextResponse.redirect(createAbsoluteUrl('/login'));
}