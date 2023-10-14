import Link from 'next/link'
import Image from 'next/image'

import Logo from './diversey-logo.png'
import LogoutButton from './LogoutButton'

export default function Navbar({ user }) {
    return (
        <nav>
            <Image
                src={Logo}
                alt='Diversey Maintenance logo'
                width={100}
                quality={100}
                placeholder='blur'></Image>
            <h1>Maintenance Support</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets" className='mr-auto'>Tickets</Link>
            {user && <span>Hello, {user.email}</span>}
            <LogoutButton />
        </nav>
    )
}
