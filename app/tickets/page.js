import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'

export default function Tickets() {
    return (
        <main>

            <div>
                <h2>Tickets</h2>
                <p><small>Currently open tickets:</small></p>
            </div>

            <Suspense fallback={<Loading />}>
                <TicketList />
            </Suspense>
        </main >
    )
}
