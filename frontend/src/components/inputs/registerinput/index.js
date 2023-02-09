import React from "react";
import "./style.css";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={`input_error ${
            desktopView
              ? field.name == "last_name"
                ? "input_error_desktop_right"
                : "input_error_desktop"
              : ""
          }`}
          style={{ transform: "translateY(3px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView
                ? field.name == "last_name"
                  ? "error_arrow_right"
                  : "error_arrow_left"
                : "error_arrow_top"
            }
          ></div>
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        style={{
          width: `${
            desktopView &&
            (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : ""
          }`,
        }}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={`input_error ${desktopView ? "input_error_desktop" : ""}`}
          style={{ transform: "translateY(-3px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? "error_arrow_left" : "error_arrow_bottom"}
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView && "70%"}` }}
        ></i>
      )}
    </div>
  );
};

export default RegisterInput;
