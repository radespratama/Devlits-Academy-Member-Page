import React from 'react'
import { Link } from 'react-router-dom'
import LottieComponents from 'react-lottie-player'

import Loading from 'assets/json/error-404.json'

export default function ErrorPage() {
    return (
        <section className="h-screen flex justify-center flex-col items-center">
            <LottieComponents 
                loop
                animationData={Loading}
                play
                style={{ width: 520, height: 290 }}
            />
            <h1 className="text-3xl text-gray-900 mt-2 font-bold">Oops! We're lost</h1>
            <p className="text-md text-gray-600 mt-4 mb-6 lg:w-3/12 xl:2/12 mx-auto text-center">
                The page that you requested is not found in our system.
            </p>
            <Link className="bg-blue-700 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" to="/">
                Back to home
            </Link>
        </section>
    )
}
