
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { notFound } from 'next/navigation'

export const dynamicParams = true;

export async function generateStaticParams() {

    const res = await fetch('http://localhost:3000/api/tickets')
    const { tickets } = await res.json()
    return tickets.map((ticket) => ({
        id: ticket._id
    }))
}

const getTicketDetail = async (id) => {
    const res = await fetch("http://localhost:3000/api/tickets/" + id, {
        next: {
            revalidate: 60
        }
    })

    if (!res.ok) {
        notFound()
    }
    return res.json()
}

export default async function TicketDetail({ params }) {

    const { ticket } = await getTicketDetail(params.id);

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
