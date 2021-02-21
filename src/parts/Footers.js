import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    const [date, setDate] = useState()
    const getYear = () => setDate(new Date().getFullYear())

    const [membertwo, setMembertwo] = useState(()=> (""));
    function submit(){
        window.open(`${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/register/?email=${membertwo}`)
    }
    useEffect(() => {
       getYear()
    }, [])

    return (
        <footer className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/6 mb-8 md:mb-0">
                    <h6 className="text-white">Company</h6>
                    <ul className="mt-4">
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">API Developer</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">Career</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">Our Story</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">New Soon</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/6 mb-8 md:mb-0">
                    <h6 className="text-white">Student</h6>
                    <ul className="mt-4">
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">Get Scholarship</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">Our Pathskills</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">All Features</Link>
                        </li>
                        <li className="mt-2">
                            <Link to="/" className="text-indigo-500 hover:text-teal-500 hover:underline">Refund Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-1/6 mb-8 md:mb-0">
                    <h6 className="text-white">Touch Us</h6>
                    <p className="mt-3 text-indigo-500 leading-loose">
                        DevLit Centre <br/>
                        Alleysi Block XI No. 46 <br/>
                        Bali, Indonesia <br/>
                        +62 8788923749 <br/>
                    </p>
                </div>
                <div className="w-full md:w-2/6 mb-8 md:mb-0">
                    <h6 className="text-white">Promotions</h6>
                    <p className="mt-2 text-indigo-500 leading-loose">
                        Submit your email for new updates
                    </p>
                    <form onSubmit={submit}>
                        <input value={membertwo} onChange={(event)=> setMembertwo(event.target.value)} type="text" className="bg-white mt-4 focus:outline-none border-0 md:px-6 px-1 py-3 md:w-1/2" placeholder="Your email address"/>
                        <button className="bg-blue-600 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-4 md:px-6 py-3">Register Now</button>
                    </form>
                </div>
            </div>
            <div className="border-t pt-8 mt-8 border-gray-700 text-center">
                <p className="text-indigo-500">
                    {date} &copy; Copyright Devlits Academy by DevLits. All Rights Reserved 
                </p>
            </div>
        </footer>
    )
}
