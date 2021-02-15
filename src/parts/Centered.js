import React from 'react'
import LottieComponents from 'react-lottie-player'

import Loading from 'assets/json/error-screen.json'

export default function Centered({children}) {
    return (
        <section className="h-screen flex justify-center flex-col items-center">
            <LottieComponents 
                loop
                animationData={Loading}
                play
                style={{ height: 320 }}
            />
        </section>
    )
}
