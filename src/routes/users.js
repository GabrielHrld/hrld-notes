const router = require("express").Router();

router.get('/users/signin', (req, res) => {
  res.send('signIn view')
})

router.get('/users/signup', (req, res) => {
  res.send('signUp view')
})

module.exports = router;
