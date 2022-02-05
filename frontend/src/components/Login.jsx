import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/images/logoCompletoMinerPro.png";
import ClientPanel from "../components/Client/ClientPanel";
import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const clientData = sessionStorage.getItem("clientData");

  const handleSubmit = (values) => {
    //let API_URL = 'https://minerproserver.herokuapp.com/api/users/login'
    let API_URL = "http://localhost:4000/api/users/login";
    axios
      .post(`${API_URL}`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        let { userData, isAdmin, token } = response.data; //eslint-disable-line
        if (isAdmin) {
          response.status === 200 &&
            localStorage.setItem(
              "minerProAdminToken",
              JSON.stringify(token)
            );
            sessionStorage.setItem(
              "minerProAdmin",
              JSON.stringify(userData)
            )
          window.location.href = "/panelAdmin";
        } else {
          sessionStorage.setItem("clientData", JSON.stringify(userData));
          window.location.href = "/panelClient";
        }
      })
      .catch(() => alert("No existe el usuario."));
  };

  return (
    <>
      {clientData ? (
        <ClientPanel />
      ) : (
        <div className="login_page">
          <div className="login_left_column">
            <Link
              to="/"
              style={{
                position: "absolute",
                left: 2,
                padding: "1em",
                textDecoration: "none",
                color:'white',
                fontWeight:'bold',
                fontSize:'.8rem'
              }}
            >
              Volver
            </Link>
            <img className="logo_login" src={logo} alt="logo" />
          </div>
          <div className="login_right_column">
            <h1 className="title_login">Bienvenido</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("*Ingresa un correo válido.")
                  .required("*Ingresa tu correo electrónico."),
                password: Yup.string()
                  .max(15, "No puede tener más de 15 caracteres.")
                  .required("*Ingresa tu contraseña."),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              <Form className="form">
                <label htmlFor="email" className="label_login">
                  Correo electrónico
                </label>
                <Field className="input_login" name="email" type="email" />
                <ErrorMessage
                  name="email"
                  render={(error) => <p className="error_login">{error}</p>}
                />

                <label htmlFor="password" className="label_login">
                  Contraseña
                </label>
                <Field
                  className="input_login"
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  render={(error) => <p className="error_login">{error}</p>}
                />

                <button className="login_submit" type="submit">
                  Entrar
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
