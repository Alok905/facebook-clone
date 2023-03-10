import React from "react";

const GenderSelect = ({ handleRegisterChange }) => {
  return (
    <div className="reg_grid">
      <label htmlFor="male">
        Male{" "}
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Female{" "}
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        Custom{" "}
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleRegisterChange}
        />
      </label>
    </div>
  );
};

export default GenderSelect;
