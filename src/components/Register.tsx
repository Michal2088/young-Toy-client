import { FunctionComponent, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { addUser } from "../services/userService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const formik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, "Must be 2 characters or more"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (user) => {
      addUser(user)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          successMsg("you register successfully");
          navigate("/");
        })
        .catch((err) => {
          errorMsg(err.response.data);
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container-fluid d-flex flex-column min-vh-100 lightBg ">
        <form onSubmit={formik.handleSubmit} className="mx-auto marginTop w-50">
          <h3 className="text-center display-5 mt-5">Sign up</h3>
          <p className="text-center">Create an account for free!</p>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">Name</label>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <p className="text-danger">{formik.errors.name}</p>
          ) : null}
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
            Sign up
          </button>
          <p className="text-center mt-3">
            <Link to={"/login"}>Already have user,Sign in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
