
import { notFound } from 'next/navigation'

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const id = params.id;
    const APIUrl = process.env.API_URL;
    const res = await fetch(`${APIUrl}/api/tickets/${id}`)
    const ticket = await res.json()

    if (!res.ok) {
        notFound();
    }
    return {
        title: `Diversey Maintenance stupport | ${ticket.title}`
    }
}

export async function generateStaticParams() {
    const APIUrl = process.env.API_URL;
    try {
        const res = await fetch(`${APIUrl}/api/tickets`)
        const { tickets } = await res.json()
        return tickets.map((ticket) => ({
            id: ticket._id
        }))
    } catch (error) {
        console.log("Could not generate static params", error)

    }
}

const getTicketDetail = async (id) => {
    const APIUrl = process.env.API_URL;

    try {
        const res = await fetch(`${APIUrl}/api/tickets/${id}`, {
            next: {
                revalidate: 60
            }
        })
        if (!res.ok) {
            console.log('res status: ', res.status)

            notFound()
        } else {
            return res.json()
        }
    } catch (error) {
        console.log('Could not get ticket detail', error)
    }
}

export default async function TicketDetail({ params }) {


    const ticket = await getTicketDetail(params.id);

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
