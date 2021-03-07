const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/users/signin", (req, res) => {
  res.render("users/signin.hbs");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/signup", (req, res) => {
  res.render("users/signup.hbs");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
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
    console.log(user.email);
    if (user.email === email) {
      req.flash("error_msg", "The email is already in use");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/users/signin");
    }
  }
});

router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
