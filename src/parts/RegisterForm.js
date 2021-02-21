import React, { useState } from 'react'
import { withRouter,  } from 'react-router-dom'

import APIusers from 'API/APIusers'

import useForm from 'helpers/hooks/useForm'
import respondError from 'helpers/fieldError'

import SelectForm from 'components/Form/Select'
import Input from 'components/Form/Type'

function RegisterForm({ history }) {

    // Set custom Hooks dari folder helpers. Mohon dipelajarin!
    const [{name, email, password, profession, otherProfession}, setState] = useForm({
        name:"", email: "", password: "", profession: "", otherProfession: ""
    })

    const [errors, setErrors] = useState(null)

    function submit(e){
        e.preventDefault()

        APIusers.register({ name, email, password, profession: profession === 'others' ? otherProfession : profession }).then((res) => {
            history.push("/login")
        }).catch(err => {
            setErrors(err?.response?.data?.message)
        })

    }

    const ERRORS = respondError(errors);

    return (
        <>
            <div className="flex justify-center items-center pb-24">
                <div className="w-full md:w-3/12">
                    <h1 className="text-4xl text-gray-900 mb-6">
                        <span className="font-bold">Grow Skills</span> From, <br/>
                        Anywhere
                    </h1>
                    <form onSubmit={submit}>
                        <Input 
                            labelName="Full Name"
                            value={name}
                            type="text"
                            placeholder="Your Name"
                            onChange={setState}
                            name="name"
                            error={ERRORS?.name?.message}
                        />

                        <Input 
                            labelName="Your Email"
                            value={email}
                            type="email"
                            placeholder="Your Email Address"
                            onChange={setState}
                            name="email"
                            error={ERRORS?.email?.message}
                        />

                        <Input 
                            labelName="Password"
                            value={password}
                            type="password"
                            placeholder="Your Password"
                            onChange={setState}
                            name="password"
                            error={ERRORS?.password?.message}
                        />
                        
                        <SelectForm name="profession" labelName="Occupation" value={profession} fallBackText="Select your focus" onClick={setState}>
                            <option value="Web Designer">Web Designer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Mobile Developer">Mobile Developer</option>
                            <option value="UI Designer">UI Designer</option>
                            <option value="UX Designer">UX Designer</option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="others">Others</option>
                        </SelectForm>

                        {
                            profession === 'others' && (
                                <Input 
                                    labelName="Other's Occupation"
                                    value={otherProfession}
                                    type="text"
                                    placeholder="Your Occupation here"
                                    onChange={setState}
                                    name="otherProfession"
                                    error={ERRORS?.otherProfession?.message}
                                />
                            )
                        }
                        <button type="submit" className="bg-blue-600 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full">Register Now</button>
                    </form>
                </div>

                <div className="w-1/12 hidden sm:block"></div>
                
                <div className="w-5/12 hidden sm:block justify-end pt-24 pl-16">
                    <div className="relative" style={{ width: 369, height: 440 }}>
                        <div className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0" style={{ width: 324, height: 374 }}></div>
                        <div className="absolute w-full h-full -mb-8 -ml-8">
                            <img src="/assets/images/img-register.jpg" alt="User Reviews"/>
                        </div>

                        <div className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 shadow-sm -mr-12" style={{ width: 290 }}>
                            <p className="text-gray-900 mb-2">
                            Semua materi terstruktur baik
                            dan mentor yang lihai
                            </p>
                            <span className="text-gray-600">Radit, DevOps</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(RegisterForm)