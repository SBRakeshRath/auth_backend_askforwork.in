const router = require("express").Router();

router.use("/", require("./getNewSessionCookie"));
router.use("/dashboardLogin", require('./dashboardLogin'))
router.use("/newUserStepLogin", require('./newUserStepLogin'))


module.exports = router;
