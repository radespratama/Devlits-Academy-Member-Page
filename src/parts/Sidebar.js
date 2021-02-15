import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

import {ReactComponent as DefaultAvatar} from 'assets/images/icon-avatar.svg'
import APIuser from 'API/APIusers'

function Sidebar({ match, history }) {
    const getNavLinkClass = (path) => {
        return match.path === path ? 'active text-white bg-indigo-900' : 'text-indigo-500'
    }
    const USERS = useSelector( (state) => state.users)

    function logout(){
        APIuser.logout().then(() => {
            localStorage.removeItem("DEVLITS:token")
            history.push("/login")
        })
    }
    return (
        <aside className="bg-indigo-1000 max-h-screen h-screen overflow-y-auto" style={{ width: 280 }}>
            <div className="max-h-screen h-screen fixed bg-indigo-1000 flex flex-col content-between" style={{ width: 280 }}>
                <div className="flex flex-col text-center mt-8">
                    <div className="border border-indigo-500 mx-auto p-2 inline-flex rounded-full overflow-hidden mb-3">
                        {
                            USERS?.avatar ? <img className="object-cover w-24 h-24" src={USERS?.avatar} alt={USERS?.name ?? 'Avatar User'}/>
                            :
                            <DefaultAvatar className="fill-indigo-600" style={{ width: 90, height: 90 }}></DefaultAvatar>
                        }
                    </div>
                    <h6 className="text-white text-xl">
                        {USERS?.name ?? 'Name Student'}
                    </h6>
                    <span className="text-indigo-400 text-sm">
                        {USERS?.profession ?? 'Profession'}
                    </span>
                </div>

                <ul className="main-menu mt-12">
                    <li>
                        <Link className={['nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left', getNavLinkClass("/")].join(" ")} to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        My Class
                        </Link>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" className={['nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500',].join(" ")} href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Library
                        </a>
                    </li>
                    <li>
                        <Link className={['nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left', getNavLinkClass("/transactions")].join(" ")} to="/transactions">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Transaction
                        </Link>
                    </li>
                    <li>
                        <Link className={['nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left', getNavLinkClass("/settings")].join(" ")} to="/settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Setting
                        </Link>
                    </li>
                </ul>

                <div className="my-auto"></div>

                <ul className="main-menu mt-12">
                    <li>
                        <button className={['nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500'].join(" ")} onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default withRouter(Sidebar)