import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/images/logoCompletoMinerPro.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../styles/login.css";

const ChangePassword = () => {
  const clientData = JSON.parse(sessionStorage.getItem("clientData"));
  const [show, setShow] = useState("password");
  
  const handleSubmit = (values) => {
    const API_URL = process.env.REACT_APP_LOCAL_API;
    axios
      .post(`${API_URL}/users/change-password/${clientData.id}`, {
        password: values.confirmPassword,
      })
      .then(() => {
        window.location.href = "/login";
        alert("Contraseña actualizada.");
      })
      .catch(() => alert("No se pudo actualizar la contraseña."));
  };

  return (
    <>
      <div className="login_page">
        <div className="login_left_column">
          <img className="logo_login" src={logo} alt="logo" />
        </div>
        <div className="login_right_column">
          <h1 className="title_login">Cambio de contraseña</h1>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={Yup.object({
              password: Yup.string()
                .max(15, "No puede tener más de 15 caracteres.")
                .required("*Ingresa nueva contraseña."),
              confirmPassword: Yup.string()
                .max(15, "No puede tener más de 15 caracteres.")
                .required("*Ingresa tu contraseña.")
                .oneOf(
                  [Yup.ref("password"), null],
                  "La contraseña no coincide."
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            <Form className="form">
              <label htmlFor="password" className="label_login">
                Nueva Contraseña
              </label>
              <Field className="input_login" name="password" type={show} />
              <ErrorMessage
                name="password"
                render={(error) => <p className="error_login">{error}</p>}
              />

              <label htmlFor="confirmPassword" className="label_login">
                Confirma contraseña
              </label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Field
                  className="input_login"
                  name="confirmPassword"
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
                name="confirmPassword"
                render={(error) => <p className="error_login">{error}</p>}
              />
              <button className="login_submit" type="submit">
                Confirmar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
