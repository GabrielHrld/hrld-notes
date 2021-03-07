const router = require("express").Router();
const passport = require("passport");
const validate = require("../utils/validate-users");

router.get("/users/signin", (req, res) => {
  res.render("users/signin.hbs");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {  //Ejecutamos nuestra estrategia de autenticación
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
  validate(req, res, name, email, password, confirm_password);
});

router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
