import { Form, Formik } from "formik";
import React, { useState } from "react";
import RegisterInput from "../inputs/registerinput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import { DotLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import {} from "@reduxjs/toolkit";
import { LOGIN } from "../../slices/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const RegisterForm = ({ setVisible }) => {
  const navigate = useNavigate();

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: currentYear,
    bMonth: currentMonth,
    bDay: currentDay,
    gender: "",
  };

  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => currentYear - index);
  const months = Array.from(new Array(12), (val, index) => index + 1);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed"
      ),
    last_name: Yup.string()
      .required("What's your last name?")
      .min(2, "Last name must be between 2 and 16 characters")
      .max(16, "Last name must be between 2 and 16 characters")
      .matches(
        /^[aA-zZ]+$/,
        "Numbers, spaces and special characters are not allowed"
      ),
    email: Yup.string()
      .required("Email is needed for login as well as to reset your password")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of atleast 6 letters, numbers and punctuation marks(such as i and &)"
      )
      .min(6, "Password must be atleast 6 characters")
      .max(36, "Password can't be more than 36 characters"),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLading] = useState(false);

  const dispatch = useDispatch();

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      setLading(false);

      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch(LOGIN(rest));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let picked_date = new Date(bYear, bMonth, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMore70 = new Date(1970 + 70, 0, 1);
            if (currentDate - picked_date < atleast14) {
              setDateError("Underage:You are not 14");
            } else if (currentDate - picked_date > noMore70) {
              setDateError("Overage: You are more than 70");
            } else if (gender === "") {
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setGenderError(null);
              setDateError(null);
              setLading(true);
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  bottom
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  bottom
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  bottom
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  bottom
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  handleRegisterChange={handleRegisterChange}
                  months={months}
                  dateError={dateError}
                  years={years}
                />
                {dateError && (
                  <div className="input_error">
                    {dateError}r<div className="error_arrow_bottom"></div>
                  </div>
                )}
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
                {genderError && (
                  <div className="input_error">
                    {genderError}
                    <div className="error_arrow_bottom"></div>
                  </div>
                )}
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy.&nbsp;</span> and{" "}
                <span>Cookie Policy.</span> You may receive SMS notifications
                from us and can opt out at any time
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
