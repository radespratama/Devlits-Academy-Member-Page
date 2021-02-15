import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import propTypes from 'prop-types'

import {ReactComponent as Logo} from 'assets/images/logo-devlits.svg'

function Header({ onLight, location }) {

    const linkColor = onLight ? "text-gray-800" : "text-white";

    // Rute jika kita mengklik button CTA
    const linkCTA = location.pathname.indexOf("/login") > -1 ? `/register` : 
    `/login`

    const textCTA = location.pathname.indexOf("/login") > -1 ? 'Sign Up' : 'Login'

    return (
        <header className="flex justify-between items-center">
            <Logo style={{ height: 43 }} className={ onLight ? 'on-light' : 'on-dark'}></Logo>
            <ul className="flex">
                <li className="nav-item">
                    <Link to="/" className={[linkColor, "text-white hover:text-teal-600 text-md px-6 py-3"].join(" ")}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/mentors" className={[linkColor, "text-white hover:text-teal-600 text-md px-6 py-3"].join(" ")}>Mentors</Link>
                </li>
                <li className="nav-item">
                    <Link to="/jobs" className={[linkColor, "text-white hover:text-teal-600 text-md px-6 py-3"].join(" ")}>Jobs</Link>
                </li>
                <li className="nav-item">
                    <Link to="/events" className={[linkColor, "text-white hover:text-teal-600 text-md px-6 py-3"].join(" ")}>Events</Link>
                </li>
                <li className="nav-item">
                    <Link to={linkCTA} rel="noopener noreferrer" className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-md px-6 py-3 ml-6">{ textCTA }</Link>
                </li>
            </ul>
        </header>
    )
}

Header.propTypes = {
    onLight: propTypes.bool,
}

export default withRouter(Header)