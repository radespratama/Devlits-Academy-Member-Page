import React from 'react'
import LottieComponents from 'react-lottie-player'

import Loading from 'assets/json/loading-animations.json'

export default function ErrorPage() {
    return (
        <section className="h-screen flex justify-center flex-col items-center">
            <LottieComponents 
                loop
                animationData={Loading}
                play
                style={{ width: 320, height: 320 }}
            />
        </section>
    )
}
