import React from 'react'

export default function EmptyState() {
    return (
        <section className="h-screen flex justify-center flex-col items-center">
            <div className="w-5/12 text-center py-12 mx-auto">
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon-files.png`} alt="Time to Invest"/>
                <h1 className="text-3xl text-gray-900 mt-12">Time to Invest</h1>
                <p className="text-lg text-gray-600 mt-4 mb-8 mx-auto text-center">
                    It seems you don't have any transactions
                </p>
                <a className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5" href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`} target="_blank" rel="noopener noreferrer">Mulai Belajar</a>
            </div>
        </section>
    )
}
