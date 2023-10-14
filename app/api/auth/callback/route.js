import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";


export async function GET(req) {
    console.log(req.body)
    const url = new URL(req.url)
    const code = url.searchParams.get('code')

    if (code) {
        const cookieStore = cookies()

        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(url.origin)
}