const router = require("express").Router();

router.get("/user", (req, res) => {
  res.send("Welcome to user end");
});

module.exports = router;
