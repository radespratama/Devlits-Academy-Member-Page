import React from 'react'
import { Link } from 'react-router-dom'

export default function ServerError() {
    return (
        <section className="h-screen flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-500.png`} alt="Server Error!"/>
            <h1 className="text-3xl text-gray-900 mt-12 font-bold">Oops! Server Error</h1>
            <p className="text-md text-gray-600 mt-4 mb-6 lg:w-3/12 xl:2/12 mx-auto text-center">
                Mostly this cause by the server was busy, please try again later.
            </p>
            <Link className="bg-blue-700 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" to="/">
                Back to home
            </Link>
        </section>
    )
}
