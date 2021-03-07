const User = require('../models/User')

const validation = async (req, res, name, email, password, confirm_password) => {
  const errors = [];
  if (name.length <= 0) {
    errors.push({ text: "Please insert your name" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Please insert your email" });
  }
  if (password.length <= 0) {
    errors.push({ text: "Please insert an password" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password does not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const user = await User.findOne({ email: email });
    if (user) {
      req.flash("error", "The email is already in use");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/users/signin");
    }
  }

  return {req, res}
};

module.exports = validation;
