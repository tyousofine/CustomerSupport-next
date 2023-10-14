
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



const getTickets = async () => {
    const supabase = createServerComponentClient({ cookies })

    const { data, error } = await supabase.from('Tickets')
        .select()

    if (error) {
        console.log(error.message)
    }
    return data
}



export default async function TicketList() {
    const tickets = await getTickets();
    return (
        <>  {tickets.length === 0 ? (
            <p className='text-center mt-16'>There are no open tickets.</p>
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
