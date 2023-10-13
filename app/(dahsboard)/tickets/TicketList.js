import React from 'react'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

const getTickets = async () => {
    const res = await fetch('http://localhost:3000/api/tickets', {
        method: "GET",
    })
    const json = await res.json()

    if (json.error) {
        console.log('Error fetching tickets from db: ', error.message)
    }

    return json.data;
}

export default async function TicketList() {
    const tickets = await getTickets();
    return (
        <>  {!tickets ? (
            <p className='text-center'>There are no open tickets.</p>
        ) : (
            <>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className='tile my-5'>
                        <Link href={`/tickets/${ticket.id}`}>

                            <h3>{ticket.title}</h3>
                            <p>{ticket.body.slice(0, 200)}...</p>
                            <div className={`pill ${ticket.priority}`}>
                                {ticket.priority} priority
                            </div>
                        </Link>
                    </div>
                ))}
            </>

        )}
        </>
    )
}
