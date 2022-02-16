const router = require("express").Router();

router.use("/", require("./getNewSessionCookie"));
module.exports = router;
