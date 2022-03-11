import React from 'react'
import logo from '../../assets/images/logoCompletoMinerPro.png'

const InProgress = () => {
  return (
    <div style={{minHeight:'100vh', marginBottom:'-30px', color:'white'}}>
    <img src={logo} alt='logo_minerpro' style={{width:'20em', marginBottom:'2em', marginTop:'10em'}}/>
        <h3 style={{fontWeight:'bold'}}>En desarrollo</h3>
    </div>
  )
}

export default InProgress