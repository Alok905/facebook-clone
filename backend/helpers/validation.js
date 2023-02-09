const User = require("../models/User");

const validateEmail = (email) => {
  return email
    .toString()
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d\-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const validateLength = (text, min, max) => {
  return !(text.length < min || text.length > max);
};

const validateUsername = async (username) => {
  let a = false;

  do {
    let check = await User.findOne({ username });
    if (check) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
module.exports = { validateEmail, validateLength, validateUsername };
