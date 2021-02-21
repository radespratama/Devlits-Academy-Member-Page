import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import propTypes from 'prop-types'

import {ReactComponent as Logo} from 'assets/images/logo-devlits.svg'

function Header({ onLight, location }) {
    const [ToggleMenuHeader, setToggleMenu] = useState(false)

    const linkColor = onLight ? "text-white sm:text-gray-800" : "text-white";
    // Rute jika kita mengklik button CTA
    const linkCTA = location.pathname.indexOf("/login") > -1 ? `/register` : 
    `/login`
    const textCTA = location.pathname.indexOf("/login") > -1 ? 'Sign Up' : 'Login'

    const classLogo = onLight ? ToggleMenuHeader ? 'on-dark' : 'on-light' : 'on-light'

    return (
        <header className={["flex justify-between items-center", ToggleMenuHeader ? "fixed w-full -mx-4 px-4" : ""].join(" ")}>
            <Logo style={{ height: 43, zIndex: 50 }} className={ classLogo }></Logo>
            <div className="flex sm:hidden">
                <button onClick={() => setToggleMenu(prev => !prev)} className={[
                    "toggle z-50", ToggleMenuHeader ? "active" : ""
                    ].join(" ")}>
                </button>
            </div>
            <ul className={["transition-all duration-300 inset-0 fixed bg-indigo-1000 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible items-center", ToggleMenuHeader ? "opacity-100 visible z-20" : "opacity-0 invisible"].join(" ")}>
                <li className="nav-item leading-10">
                    <Link to="/" className={[linkColor, "hover:text-teal-600 text-md px-6 py-3 my-4 sm:my-0"].join(" ")}>Home</Link>
                </li>
                <li className="nav-item leading-10">
                    <Link to="/mentors" className={[linkColor, "hover:text-teal-600 text-md px-6 py-3 my-4 sm:my-0"].join(" ")}>Mentors</Link>
                </li>
                <li className="nav-item leading-10">
                    <Link to="/jobs" className={[linkColor, "hover:text-teal-600 text-md px-6 py-3 my-4 sm:my-0"].join(" ")}>Jobs</Link>
                </li>
                <li className="nav-item leading-10">
                    <Link to="/events" className={[linkColor, "hover:text-teal-600 text-md px-6 py-3 my-4 sm:my-0"].join(" ")}>Events</Link>
                </li>
                <li className="nav-item leading-10 mt-6 sm:mt-0">
                    <Link to={linkCTA} rel="noopener noreferrer" className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-md px-6 py-3 my-4 sm:my-0 ml-6">{ textCTA }</Link>
                </li>
            </ul>
        </header>
    )
}

Header.propTypes = {
    onLight: propTypes.bool,
}

export default withRouter(Header)