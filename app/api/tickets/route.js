
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

// uncomment this if errros:
export const dynamic = 'force-dynamic'

//get supabse instance
const supabase = createRouteHandlerClient({ cookies });

export async function POST(req, res) {
    const ticket = await req.json();
    // get current user session
    const { data: { session } } = await supabase.auth.getSession();
    // insert data in supabase
    const { data, error } = await supabase.from('Tickets')
        .insert({
            ...ticket,
            user_email: session.user.email
        })
        .select()
        .single()

    return NextResponse.json({ data, error })
}

export async function GET(req) {
    const { data, error } = await supabase.from('Tickets').select();
    return NextResponse.json({ data, error })

}






