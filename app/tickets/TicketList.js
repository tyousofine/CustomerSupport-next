import React from 'react'
import clientPromise from '@/lib/mongodb'

async function getTickets() {
    try {
        const db = (await clientPromise).db(process.env.DB_NAME)
        const coll = db.collection(process.env.COL_NAME)

        const tickets = coll.find({});


        let ticketArray = [];
        for await (let ticket of tickets) {
            ticketArray.push(ticket)
        }
        return ticketArray

    }
    catch (error) {
        console.log('ERROR:', error)
    }
}


export default async function TicketList() {
    const tickets = await getTickets();

    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className='tile my-5'>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0, 200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>

                </div>
            ))}
            {tickets.length === 0 && (
                <p className='text-center'>There are no open tickets.</p>
            )}
        </>
    )
}
