"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low');
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);


        const ticket = {
            title,
            body,
            priority,
        }

        const res = await fetch(`/api/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })

        const json = await res.json()

        if (json.error) {
            console.log('Fetch POST error: ', error)

        }

        if (json.data) {
            router.refresh()
            router.push('/tickets')
        }
        setIsLoading(false)

    }

    return (
        <form className='w-1/2'
            onSubmit={handleSubmit}>
            <label>
                <span>Title:</span>
                <input
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
            </label>
            <label>
                <span>Details:</span>
                <input
                    type="text"
                    required
                    onChange={(e) => setBody(e.target.value)}
                    value={body} />
            </label>
            <label>
                <span>Priority:</span>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>
            <button className='btn-primary'
                disabled={isLoading}>
                {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
            </button>
        </form>
    )
}
