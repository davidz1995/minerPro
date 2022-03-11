import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/images/logoCompletoMinerPro.png";
import ClientPanel from "../components/Client/ClientPanel";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../styles/login.css";

const Login = () => {
  const clientData = sessionStorage.getItem("clientData");
  const [show, setShow] = useState("password");
  const [buttonMessage, setButtonMessage] = useState("Entrar");

  const handleSubmit = (values) => {
    const API_URL = process.env.REACT_APP_LOCAL_API;
    setButtonMessage('Cargando ...')
    axios
      .post(`${API_URL}/users/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        let { userData, isAdmin, token } = response.data; //eslint-disable-line
        if (isAdmin) {
          response.status === 200 &&
            localStorage.setItem("minerProAdminToken", JSON.stringify(token));
          sessionStorage.setItem("clientData", JSON.stringify(userData));
          window.location.href = "/panelAdmin";
        } else {
          sessionStorage.setItem("clientData", JSON.stringify(userData));
          window.location.href = "/panelClient";
        }
      })
      .catch(() => {
        setButtonMessage('Esperar')
        alert('Datos incorrectos.')
      });
  };

  return (
    <>
      {clientData && clientData.status === "Active" ? (
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
                color: "white",
                fontWeight: "bold",
                fontSize: ".8rem",
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Field
                    className="input_login"
                    name="password"
                    type={show}
                    style={{ width: "90%" }}
                  />
                  {show === "password" ? (
                    <VisibilityIcon
                      style={{ marginTop: ".3em" }}
                      onClick={() => {
                        show === "password"
                          ? setShow("text")
                          : setShow("password");
                      }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ marginTop: ".3em" }}
                      onClick={() => {
                        show === "password"
                          ? setShow("text")
                          : setShow("password");
                      }}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  render={(error) => <p className="error_login">{error}</p>}
                />

                <p>
                  Olvidaste tu contraseña?{" "}
                  <Link to={"/recover-password"}>Haz click aquí.</Link>{" "}
                </p>

                <button
                  className="login_submit"
                  type="submit"
                >
                  {buttonMessage}
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
