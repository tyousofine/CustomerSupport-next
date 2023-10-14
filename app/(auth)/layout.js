import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/diversey-logo.png'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }) {
    const supabase = createServerActionClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        redirect('/')
    }
    return (
        <>
            <nav>
                <Image
                    src={Logo}
                    alt='Diversey Maintenance logo'
                    width={100}
                    quality={100}
                    placeholder='blur'></Image>
                <h1>Maintenance Support</h1>
                <Link href="/signup">Sign up</Link>
                <Link href="/login">Login</Link>
            </nav>
            {children}
        </>
    )
}
