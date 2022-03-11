import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logoCompletoMinerPro.png'

const RecoverPassword = () => {
  return (
    <div style={{minHeight:'100vh', marginBottom:'-30px', color:'white'}}>
    <img src={logo} alt='logo_minerpro' style={{width:'20em', marginBottom:'2em', marginTop:'10em'}}/>
        <h3 style={{fontWeight:'bold'}}>Recuperar tu contraseña</h3>
        <p style={{marginBottom:'5em', marginTop:'2em', fontSize:'1.5rem'}}>Ponte en contacto con el equipo de MinerPro, para ayudarte a recuperar tu contraseña.</p>
        <Link to='/' style={{color:'white'}}>Home</Link>
    </div>
  )
}

export default RecoverPassword