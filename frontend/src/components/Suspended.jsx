import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logoCompletoMinerPro.png'

const Suspended = () => {
  return (
    <div style={{minHeight:'100vh', marginBottom:'-30px', color:'white'}}>
    <img src={logo} alt='logo_minerpro' style={{width:'20em', marginBottom:'2em', marginTop:'10em'}}/>
        <h1 style={{fontWeight:'bold'}}>Tu cuenta ha sido suspendida.</h1>
        <p style={{marginBottom:'10em'}}>Si quieres activarla, comunicate con el equipo de MinerPro.</p>
        <Link to='/' style={{color:'white'}}>Home</Link>
    </div>
  )
}

export default Suspended