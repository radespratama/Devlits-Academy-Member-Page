import React from 'react'

import {Link} from 'react-router-dom'

export default function Unauthenticated({ fallbackUrl, fallbackText, external }) {
    return (
        <section className="h-screen flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-security.png`} alt="You are not supposed here, please login"/>
            <h1 className="text-3xl text-gray-900 mt-12 font-bold">Wow! How are you here ?</h1>
            <p className="text-md text-gray-600 mt-4 mb-6 lg:w-3/12 xl:2/12 mx-auto text-center">
                Seems like do no have access for this page. We are sorry.
            </p>
            {
                external ? <a className="bg-blue-500 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" href={fallbackUrl}>{fallbackText || 'Logging me in'}</a> : 
                <Link className="bg-blue-700 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" to={fallbackUrl || '/login'}>
                    {fallbackText || 'Logging me in'}
                </Link>
            }
        </section>
    )
}
