const router = require("express").Router();

router.get('/notes', (req, res) => {
  res.send('notes view')
})

module.exports = router;
