import { Form, Formik } from "formik";
import React, { useState } from "react";
import LoginInput from "../inputs/logininput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import {} from "@reduxjs/toolkit";
import { LOGIN } from "../../slices/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};
const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);

  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        login
      );
      setError("");
      setLoading(false);

      setTimeout(() => {
        dispatch(LOGIN(data));
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={login}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
              setLoading(true);
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or Phone number"
                  onChange={handleLoginChange}
                  // value={login.email}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleLoginChange}
                  bottom
                  // value={login.password}
                />
                <button type="submit" className="blue_btn">
                  Log in
                </button>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>}
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
