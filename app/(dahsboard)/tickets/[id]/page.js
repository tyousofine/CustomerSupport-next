
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

//components
import DeleteButton from './DeleteButton';

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies })

    const { data: ticket } = await supabase.from('Tickets')
        .select()
        .eq('id', params.id)
        .single()

    return {
        title: `Maintenance Support | ${ticket?.title || 'Ticket not found'}`
    }
}

const getTicketDetail = async (id) => {
    const supabase = createServerComponentClient({ cookies })

    const { data } = await supabase.from('Tickets')
        .select()
        .eq('id', id)
        .single()

    if (!data) {
        notFound()
    }
    return data
}

export default async function TicketDetail({ params }) {

    const ticket = await getTicketDetail(params.id);

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()


    return (
        <main>
            <div className='flex'>
                <h2>Ticket Details</h2>
                <div className="ml-auto">
                    {data.session.user.email === ticket.user_email &&
                        <DeleteButton id={ticket.id} />}
                </div>
            </div>
            <>{!ticket ? (<div>Could not find ticket</div>) : (
                <div className='tile'>
                    <h3>{ticket.title}</h3>
                    <small>Created by {ticket.user_email}</small>
                    <p>{ticket.body}</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                    </div>
                </div>
            )}</>
        </main>
    )
}
