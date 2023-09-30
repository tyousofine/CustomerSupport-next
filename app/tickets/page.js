import React, { Suspense } from 'react'
// import TicketList from '../components/TicketList'
// import TicketList from './TicketList'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

export default function Tickets() {
    return (
        <main>
            <div className='flex justify-between'>
                <div>
                    <h2>Tickets</h2>
                    <p><small>Currently open tickets:</small></p>
                </div>
                <div>
                    <Link href="/tickets/create">
                        <button className="btn-primary">Create Tickets</button>
                    </Link>
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                {/* <TicketList /> */}
                <div>HELLO TEST BUILDING!</div>
            </Suspense>
        </main >
    )
}
