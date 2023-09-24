import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import Logo from './diversey-logo.png'

export default function Navbar() {
    return (
        <nav>
            <Image
                src={Logo}
                alt='Diversey Maintenance logo'
                width={100}
                quality={100}
                placeholder='blur'></Image>
            <h1>Diversey Support</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
        </nav>
    )
}
