import React from 'react'
import { withRouter  } from 'react-router-dom'
import {useDispatch} from 'react-redux';

import APIusers from 'API/APIusers'
import { setAuthorizationHeader } from 'configs/axios'
import { populateProfile } from 'store/actions/users'

import useForm from 'helpers/hooks/useForm'

function LoginForm({ history }) {
    const dispatch = useDispatch();

    // Set custom Hooks dari folder helpers. Mohon dipelajarin!
    const [{email, password}, setState] = useForm({
        email: "", password: ""
    })

    // Lalu function setState kita set di function onChange di form input
    // Dan function state di hubungkan dengan value di input menjadi (state.email)
    // Cara kedua bisa langsung destruction function state menjadi {email, password}

    function submit(e){
        e.preventDefault()

        APIusers.login({ email, password }).then((res) => {
            // console.log(res);
            setAuthorizationHeader(res.data.token ?? 'Login Down')
            APIusers.details().then((detail) => {
                dispatch(populateProfile(detail.data))
                const production = process.env.REACT_APP_FRONTPAGE_URL === "https://devlits-academy.vercel.app" ? "Domain = devlits-academy.vercel.app" : ""

                // Menghubungkan ke LocalStorage
                localStorage.setItem("DEVLITS:token", JSON.stringify({ // Fungsi JSON.stringify untuk melewati Object object saat hit API
                    ...res.data, email: email
                }))
                const redirect = localStorage.getItem("DEVLITS:redirect")
                const userCookie = {
                    name: detail.data.name,
                    thumbnail: detail.data.avatar,
                }

                // Membuat expires cookie menggunakan native JS *Mohon Dipelajari!
                const expires = new Date(
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                )
                document.cookie = `DEVLITS:user=${JSON.stringify(userCookie)}; expires=${expires.toUTCString()}; path:/; ${production}`
                history.push((redirect || "/"))
            })
  
        }).catch(err => {

        })
    }

    return (
        <>
            <div className="flex justify-center items-center pb-24">
                <div className="w-3/12">
                    <h1 className="text-4xl text-gray-900 mb-6">
                        <span className="font-bold">Continue</span> Study, <br/>
                        Finish your <span className="font-bold">Goals</span>
                    </h1>
                    <form onSubmit={submit}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="text-md mb-2 text-gray-900">Email Address</label>
                            <input type="email" name="email" onChange={setState} className="bg-white focus:outline-none border px-4 w-full rounded py-3 border-gray-600" value={email} placeholder="Your email address"/>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-md mb-2 text-gray-900">Password</label>
                            <input type="password" name="password" onChange={setState} className="bg-white focus:outline-none border px-4 w-full py-3 rounded border-gray-600" value={password} placeholder="Your password"/>
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full">Login</button>
                    </form>
                </div>

                <div className="w-1/12"></div>
                
                <div className="w-5/12 flex justify-end pt-24 pl-16">
                    <div className="relative" style={{ width: 369, height: 440 }}>
                        <div className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0" style={{ width: 324, height: 374 }}></div>
                        <div className="absolute w-full h-full -mb-8 -ml-8">
                            <img src="/assets/images/img-login.jpg" alt="User Reviews"/>
                        </div>

                        <div className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 shadow-sm -mr-12" style={{ width: 290 }}>
                            <p className="text-gray-900 mb-2">
                            Semua sudah terarah dengan
                            baik dan perlu ikuti saja
                            </p>
                            <span className="text-gray-600">Rista, UI Designer</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(LoginForm)