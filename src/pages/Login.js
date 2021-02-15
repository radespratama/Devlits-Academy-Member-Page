import React, { useEffect, } from 'react'
import Header from 'parts/Header'
import Footer from 'parts/Footers'
import LoginForm from 'parts/LoginForm'


export default function Login() {

    useEffect(() => {
        document.title = "Devlits | Login"
        window.scroll(0,0)
    }, [])

    return (
        <>
            <section className="container mx-auto pt-10">
                <Header onLight></Header>
            </section>
            <section className="container mx-auto pt-10">
                <LoginForm></LoginForm>
            </section>
            <section className="mt-24 bg-indigo-1000 py-12">
                <Footer></Footer>
            </section>
        </>
    )
}
