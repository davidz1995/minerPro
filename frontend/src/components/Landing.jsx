import React from 'react'
import BodyLanding from './BodyLanding'
import NavBar from './NavBar'
import ParticlesComponent from './ParticlesComponent'
import '../styles/landing.css'


function Landing() {

    return (
        <div className='container_landing'>
            <NavBar variant='dark' bg={null}/>
            <BodyLanding/>
            <div style={{position:'relative'}}>
                <ParticlesComponent/>
            </div>
        </div>
    )
}

export default Landing
