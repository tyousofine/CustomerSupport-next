"use client"

import { useState } from 'react';
import { useRouter } from 'react';

export default function CreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low');
    const [isLoading, setIsLoading] = useState(false)


    return (
        <form className='w-1/2'>
            <label>
                <span>Title:</span>
                <input
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />


            </label>
        </form>
    )
}
