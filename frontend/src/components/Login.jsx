import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:4000/api/users/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        let { user, isAdmin, token } = response.data;
        if (isAdmin) {
          response.status === 200 &&
            localStorage.setItem("prueba", response.data.token);
            window.location.href = '/panelAdmin'
        } else {
            window.location.href = '/panelClient'
        }
      })
      .catch(() => alert("No existe el usuario."));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingresa un email válido.")
        .required("Por favor, escribe tu mail"),
      password: Yup.string()
        .min(5, "Tiene que tener mínimo 5 caracteres")
        .required("Por favor, ingresa tu contraseña"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div style={{ height: "100vh", marginBottom: "-30px" }}>
      <form onSubmit={formik.handleSubmit} style={{ color: "white" }}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 8cbc64e128501893ed3864430fa22329c6c45d18
