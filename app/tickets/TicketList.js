import React from 'react'
import Ticket from '@/models/ticket'
import Link from 'next/link'

const getTickets = async () => {
    //for testing:
    // await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch("http://localhost:3000/api/tickets", {
        cache: "no-store"
        //or: 
        // next: {
        //     revalidate: 0
        // }
    });

    if (!res.ok) {
        throw new Error("Can not fetch data")
    }
    return res.json();
}

export default async function TicketList() {
    const { tickets } = await getTickets();
    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket._id} className='tile my-5'>
                    <Link href={`/tickets/${ticket._id}`}>

                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className='text-center'>There are no open tickets.</p>
            )}
        </>
    )
}
