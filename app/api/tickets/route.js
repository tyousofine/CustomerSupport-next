
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// uncomment this if errros:
export const dynamic = 'force-dynamic'

//get supabse instance

export async function POST(req, res) {
    const supabase = createRouteHandlerClient({ cookies });
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


// couldnt get the cookie work on server side.
export async function GET(request) {
    const supabase = createRouteHandlerClient({ cookies });
    // console.log('SUPABASE: ', supabase)
    const { data: { session } } = await supabase.auth.getSession();

    const { data, error } = await supabase.from('Tickets').select();
    // console.log('DATA: ', data)
    return NextResponse.json({ data, error })
}






