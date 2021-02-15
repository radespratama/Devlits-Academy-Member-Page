import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Sidebar from 'parts/Sidebar'
import ListClassItem from 'parts/ListClassItem'
import Loading from 'parts/Loading'

import APIcourses from 'API/APIcourses'
import {statusCourses, fetchCourses, messageCourse} from 'store/actions/courses'

function EmptyState(){
    return (
        <section className="flex h-screen items-center">
            <div className="w-5/12 text-center py-12 mx-auto">
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon-archive.png`} alt="Success Joined"/>
                <h1 className="text-3xl text-gray-900 mt-12 font-bold">Time to Invest</h1>
                <p className="text-lg text-gray-600 mt-4 mb-8 mx-auto text-center">
                    It seems you don't have any class <br />
                    yet so let's get them and grow your skills.
                </p>
                <a
                target="_blank" rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" href={`${process.env.REACT_APP_FRONTPAGE_URL}/library`}>
                    Cari Kelas
                </a>
            </div>
        </section>   
    )
}

export default function MyClass() {
    const dispatch = useDispatch()
    const COURSES = useSelector(state => state.courses)

    useEffect(() => {
        document.title = "Devlits | My Class"
       window.scroll(0,0)
       dispatch(statusCourses('loading'))

       APIcourses.mine().then((res)=> {
           dispatch(fetchCourses(res.data))
       })
       .catch((err) => {
           dispatch(messageCourse(err?.response?.data?.message ?? 'Error!'))
       })
    }, [dispatch])

    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <main className="flex-1">
                <div className="px-16">
                    {COURSES.status === 'loading' && <Loading></Loading>}
                    {COURSES.status === 'error' && COURSES.message}
                    {COURSES.status === 'ok' &&
                        (COURSES.total > 0 ? 
                            (<>
                                <section className="flex flex-col mt-8">
                                    <h1 className="text-4xl text-gray-900 font-medium">
                                        My Class
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Continue learning to pursue your dreams
                                    </p>
                                </section>
                                <section className="flex flex-col mt-8">
                                    <div className="flex justify-start items-center -mx-4">
                                        {
                                            Object.values(COURSES.data)?.map((item, index) => {
                                                return (
                                                    <ListClassItem data={item.course} key={index}></ListClassItem>
                                                )
                                            })
                                        }
                                    </div>
                                </section>
                            </>)
                            : 
                            (<EmptyState></EmptyState>)
                        )
                    }
                </div>
            </main>
        </div>
    )
}
