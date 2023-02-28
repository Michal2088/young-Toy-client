import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as Yup from "yup";
import { User } from "../interfaces/User";
import { checkUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required").min(10, "Must be 10 characters or more"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values: User, { resetForm }) => {
      checkUser(values)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          successMsg("you logged in successfully");
          navigate(-1);
        })
        .catch((err) => {
          resetForm();
          errorMsg(err.response.data);
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
return (
    <div className="container-fluid d-flex flex-column min-vh-100 lightBg ">

      <form onSubmit={formik.handleSubmit} className="w-50 mx-auto marginTop">
        <h3 className="text-center display-5 mt-5">Sign in</h3>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            name="email"
            value={formik.values.email}
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-danger"> {formik.errors.password}</p>
        ) : null}
        <button
          type="submit"
          className="btn btn-secondary w-100 mt-3"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Sign in
        </button>
        <p className="text-center mt-3">
          <Link to={"/register"}>New in kidsToys? Sign up here</Link>
        </p>
      </form>
      
    </div>
  );
};

export default Login;