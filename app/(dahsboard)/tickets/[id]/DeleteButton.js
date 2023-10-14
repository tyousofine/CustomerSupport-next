'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TiDelete } from 'react-icons/ti'

export default function DeleteButton({ id }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


    const handleDeleteClick = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const API_URL = process.env.API_URL

        const res = await fetch(`${API_URL}/api/tickets/${id}`, {
            method: 'DELETE'
        })

        const json = await res.json();

        if (json.error) {
            console.log('ERROR deleting', error)
            setIsLoading(false);
        }

        if (!json.error) {
            router.refresh();
            router.push('/tickets')

        }
    }

    return (
        <button
            className='btn-primary'
            onClick={handleDeleteClick}
            disabled={isLoading}>
            {isLoading && (
                <>
                    <TiDelete size={20} />
                    Deleting....
                </>
            )} {!isLoading && (
                <>
                    <TiDelete size={20} />
                    Delete Ticket
                </>
            )}

        </button>
    )
}
