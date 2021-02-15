import {toast} from 'react-toastify'
import APIusers from 'API/APIusers'

import axios, { setAuthorizationHeader } from './index'

export default function errorHandler(error) {
    if(error){
        let message;
        if(error.response){
            const originalRequest = error.config
            if(error.response.status === 500) message = 'Something went terribly wrong!'
            else if(error.response.status === 403 && !originalRequest._retry){
                originalRequest._retry = true
                // Shorthand to access localstorage Name Devlits daripada localStorage.getItem('DEVLITS:token')
                const session = localStorage['DEVLITS:token'] ? JSON.parse(localStorage['DEVLITS:token']) : null
                return APIusers.refresh({refresh_token: session.refresh_token, email: session.email}).then((res)=> {
                    if(res.data){
                        setAuthorizationHeader(res.data.token)
                        localStorage.setItem("DEVLITS:token", JSON.stringify({
                            ...session, token: res.data.token //Perbarui token
                        }))

                        originalRequest.headers.authorization = res.data.token

                        return axios(originalRequest)
                    } else {
                        window.location.href="/login"
                        localStorage.removeItem("DEVLITS:token")
                    }
                })
            }
            else message = error.response.data.message

            if(typeof message === "string") toast.error(message)

            return Promise.reject(error);
        }
    }
    return (
        <div>
            
        </div>
    )
}