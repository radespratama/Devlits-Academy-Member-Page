import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SelectForm from 'components/Form/Select'
import Input from 'components/Form/Type'
import UseForm from 'helpers/hooks/useForm'
import respondError from 'helpers/fieldError'
import APIuser from 'API/APIusers'
import APImedia from 'API/APImedia'

import { populateProfile } from 'store/actions/users'
import Image2base64 from 'utils/image2base64'
import {ReactComponent as DefaultAvatar} from 'assets/images/icon-avatar.svg'

function SettingForm({ details }) {
    const dispatch = useDispatch()
    const addPicture = useRef(null)

    useEffect(() => {
        window.scroll(0,0)
    }, [])

    const [state, setKey, setState] = UseForm({
        name: details?.name ?? '',
        email: details?.email ?? '',
        profession: details?.profession ?? '',
        avatar: details?.avatar ?? '',
        password: details?.password ?? '',
        otherProfession: details?.otherProfession ?? '',
    })

    const [errors, setErrors] = useState(null)

    function previewImage(e){
        e.persist()
        Image2base64(e.target.files[0]).then((image) => {
            setKey({
                target: {
                    name: e.target.name,
                    value: image,
                }
            })
        })
    }

    async function submit(e){
        e.preventDefault()

        const payload = {
            name: state.name,
            email: state.email,
            password: state.password,
            profession: state.profession,
        }
        if(payload.profession === 'others')
        payload.profession = state.otherProfession

        if(state.avatar.indexOf("base64") > -1){
            const avatar = await APImedia.upload(state.avatar)
            payload.avatar = avatar.data.image
        }

        APIuser.update(payload).then( res => {
            toast.success('Profile updated')
            setState({
                ...state,
                password: ""
            })
            setErrors(null)
            dispatch(populateProfile({
                ...details,
                ...res.data
            }))
        }).catch( error => setErrors(error?.response?.data?.message ?? 'Error Bre') )
    }

    const ERRORS = respondError(errors);
    return (
        <>
            <section className="flex flex-col mt-8">
                <div className="flex justify-start items-center -mx-5">
                    <div className="w-auto text-center px-5">
                        <div className="rounded-full overflow-hidden w-24 h-24">
                        {
                            state.avatar ? 
                            <img className="object-cover w-full h-full" src={state.avatar} alt="Preview"/>
                            :
                            <DefaultAvatar className="fill-indigo-500" style={{ width:90, height: 90 }}></DefaultAvatar>
                        }
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <span className="text-gray-600">Add your picture...</span>
                        <div>
                            <input type="file" name="avatar" ref={addPicture} onChange={previewImage} className="hidden"/>
                            <button onClick={()=> addPicture.current.click()} className="bg-blue-600 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-8 py-2 mt-3">Browse</button>
                        </div>
                    </div>
                </div>

            </section>
            <section className="flex flex-col mt-8">
                <div className="flex items-center pb-24">
                    <div className="w-4/12">
                        <form onSubmit={submit}>
                            <Input 
                                labelName="Full Name"
                                value={state.name}
                                type="text"
                                placeholder="Your Name"
                                onChange={setKey}
                                name="name"
                                error={ERRORS?.name?.message}
                            />

                            <Input 
                                labelName="Your Email"
                                value={state.email}
                                type="email"
                                placeholder="Your Email Address"
                                onChange={setKey}
                                name="email"
                                error={ERRORS?.email?.message}
                            />

                            <Input 
                                labelName="Password"
                                value={state.password}
                                type="password"
                                placeholder="Your Password"
                                onChange={setKey}
                                name="password"
                                error={ERRORS?.password?.message}
                            />
                            
                            <SelectForm name="profession" labelName="Occupation" value={state.profession} fallBackText="Select your focus" onClick={setKey}>
                                <option value="Web Designer">Web Designer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Mobile Developer">Mobile Developer</option>
                                <option value="UI Designer">UI Designer</option>
                                <option value="others">Others</option>
                            </SelectForm>

                            {
                                state.profession === 'others' && (
                                    <Input 
                                        labelName="Other's Occupation"
                                        value={state.otherProfession}
                                        type="text"
                                        placeholder="Your Occupation here"
                                        onChange={setKey}
                                        name="otherProfession"
                                        error={ERRORS?.otherProfession?.message}
                                    />
                                )
                            }
                            <button type="submit" className="bg-blue-600 hover:bg-blue-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full">Update Profile</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default withRouter(SettingForm)