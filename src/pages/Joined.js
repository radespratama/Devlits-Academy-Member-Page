import React, { useState, useEffect, useCallback } from 'react'

import {Link} from 'react-router-dom'
import APIcourse from 'API/APIcourses'

import ServerError from 'pages/Error/500'
import Loading from 'parts/Loading'
import { toast } from 'react-toastify';

export default function Joined({ history, match }) {

    const [state, setState] = useState(() => ({
        isLoading: true,
        isError: false,
        data: {}
    }));

    const joining = useCallback(
        async () => {

            try {
                const details = await APIcourse.details(match.params.class)
                const joined = await APIcourse.join(match.params.class)
                if(joined.data.snap_url)
                window.location.href=joined.data.snap_url
                else
                setState({ isLoading: false, isError: false, data: details })
            } catch (error) {
                if(error?.response?.data?.message === "user already take this course")
                    history.push(`/courses/${match.params.class}`)
                toast(error.message)
            }
        },
        [match.params.class, history],
    )
    
    useEffect(() => {
        joining()
    }, [joining])

    if(state.isLoading) return (<Loading></Loading>)
    if(state.isError) return (<ServerError></ServerError>)

    return (
        <section className="h-screen flex flex-col items-center justify-center">
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-files.png`} alt="Success Joined"/>
            <h1 className="text-3xl text-gray-900 mt-12 font-bold text-center">Welcome to Class</h1>
            <p className="text-lg text-gray-600 mt-4 mb-6 lg:w-3/12 xl:3/12 mx-auto text-center">
                You have successfully joined our our <br/>
                <strong>{state?.data?.name ?? 'Class Name'}</strong> class
            </p>
            <Link
            className="text-center  cursor-pointer bg-blue-700 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" to={`/courses/${match.params.class}`}>
                Start learn
            </Link>
        </section>
    )
}
