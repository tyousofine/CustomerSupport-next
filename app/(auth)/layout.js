import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/diversey-logo.png'

export default function AuthLayout({ children }) {
    return (
        <>
            <nav> <Image
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
