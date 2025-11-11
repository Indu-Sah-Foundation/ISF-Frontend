import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {

    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contact = { email, message};

        try {
            await axios.post("http://localhost:8080/", contact)
            alert('Thank you');
            setEmail('');
            setMessage('');
        }

        catch (e)
        {
            console.log(e);
            alert('Please try again!');
        }
    }



    return (
        <div>
            <h1 class="text-2xl font-extrabold text-center my-20">Join Our Mailing List</h1>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Message
                            </label>
                            <div className="text-sm">
                            </div>
                        </div>
                        <div className="mt-2">
                             <textarea
                                id="message"
                                name="message"
                                rows="4"
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset "
                                placeholder=" Enter your message"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Contact
