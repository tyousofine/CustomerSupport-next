import React from 'react'


const getTicketDetail = async (id) => {
    try {
        const res = await fetch("http://localhost:3000/api/tickets/" + id)

        if (!res.ok) {
            throw new Error("Could not fetech ticket detail.")
        }

        return res.json()
    } catch (error) {
        console.log("Could not fetch ticket detail", error)

    }
}

export default async function TicketDetail({ params }) {


    const { ticket } = await getTicketDetail(params.id);
    console.log(ticket)
    return (
        <main>


            <h2>Ticket Details</h2>

            <div className='tile'>
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>

        </main>
    )
}
