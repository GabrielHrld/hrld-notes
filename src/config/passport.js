const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/User");

//estrategia de autenticación
passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, callback) => {
      const user = await User.findOne({ email });

      //validamos que exista el usuario y si existe que coincida la contraseña
      if (!user) {
        return callback(null, false, { message: "Invalid information" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return callback(null, user);
        } else {
          return callback(null, false, { message: "Invalid information" });
        }
      }
    }
  )
);

//guardamos el id del usuario en una sesión
passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

//tomamos el id para poder utilizar los datos del mismo
passport.deserializeUser((id, callback) => {
  User.findById(id, (error, user) => {
    callback(error, user);
  });
});
