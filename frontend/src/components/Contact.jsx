import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './NavBar';
import PopUp from './PopUp';
import contacts from '../utils/contact';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from 'react-bootstrap/esm/Button';
import '../styles/contact.css'
import ParticlesComponent from './ParticlesComponent';

const Contact = () => {
  return (
  <div>
    <NavBar variant='dark' bg='black'/>
    <h1 style={{paddingTop:'2.5em', color:'white', fontWeight:'bold'}}>Contacto</h1>
    <div className='container_contact' style={{color:'white', fontWeight:'bold', paddingBottom:'10px', paddingTop:'1em'}}>
        <ContactUs/>
        <Socials/>
    </div>
    <div style={{position:'relative'}}>
        <ParticlesComponent/>
    </div>
  </div>
  );
}

const Socials = () => {
    let contactInfo = contacts()
    return (
        <div className='container_socials'>
        <label className='subcontainer_socials' ><PhoneAndroidIcon /><p>{contactInfo.phone}</p></label>
        <label className='subcontainer_socials' ><AlternateEmailIcon /><p>{contactInfo.email}</p></label>
        <h3>Redes sociales</h3>
        <div style={{textAlign:'left', marginBottom:'1em'}}>
        <FacebookIcon className='socials_icons' onClick={() => console.log('hola')}/>
        <InstagramIcon className='socials_icons' onClick={() => console.log('hola')}/>
        </div>
        </div>
    )
}

const ContactUs = () => {
  const form = useRef();
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  let serviceId = process.env.REACT_APP_SERVICE_ID_EMAILJS;
  let templateId = process.env.REACT_APP_TEMPLATE_ID;
  let userId = process.env.REACT_APP_USER_ID_EMAILJS

  const sendEmail = () => {
    emailjs.sendForm(serviceId, templateId, form.current, userId)
  };

  return (
    <>
    <PopUp visible={show} message={message}/>
    <Formik
      initialValues={{ user_email: '', user_subject: '', message: '' }}
      validationSchema={Yup.object({
        user_email: Yup.string().email('Por favor, ingresa un mail válido').required('Este campo es obligatorio.'),
        user_subject: Yup.string()
          .required('Este campo es obligatorio.'),
        message: Yup.string()
        .required('Este campo es obligatorio.'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        sendEmail()
        setMessage('Tu consulta se envió correctamente.')
        setShow(true)
      }}
    >
      <Form ref={form} className='form_contact'>
        <Field className='input_contact' name="user_email" type="email" placeholder='Email'/>
        <ErrorMessage className='error_form' name="user_email" style={{marginBottom:'1em'}}/>

        <Field className='input_contact' name="user_subject" type="text" placeholder='Asunto'/>
        <ErrorMessage className='error_form'  name="user_subject" />

        <textarea className='text_area' name="user_text" type="text" placeholder='Escribe tu mensaje...'></textarea>

        <Button variant='outline-light' type="submit" style={{width:'5em', borderRadius:'0px', marginTop:'1em'}}>Submit</Button>
      </Form>
    </Formik>
    </>
  );
};

export default Contact;
