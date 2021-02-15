import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'

const GuestRoute = ({ component: Component, location, ...rest   }) => {
    const Ok = localStorage.getItem('DEVLITS:token')
    const params = location?.search.substring(1).split("&")
    const path = params.find( item => item.indexOf("path") > -1 )

    const redirect = path?.split("=")?.[1]
    if(!Ok && redirect) localStorage.setItem("DEVLITS:redirect", redirect)

    return (
        <Route 
            {...rest}
            render ={props => Ok ? <Redirect to={`/`}/> : <Component {...props} />}

        />
    )
}

export default withRouter(GuestRoute)