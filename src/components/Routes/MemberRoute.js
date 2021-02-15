import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'

const MemberRoute = ({ component: Component, match, path, location, ...rest }) => {
    const Ok = localStorage.getItem('DEVLITS:token')

    localStorage.removeItem("DEVLITS:redirect")

    return (
        <Route 
            {...rest}
            render = {
                props => Ok ? (<Component {...props} />) : path === '/joined/:class' ? <Redirect to={`/login?path=${location.pathname}`} /> : <Redirect to={`/private?path=${location.pathname}`} />
            }
        />
    )
}

export default withRouter(MemberRoute)