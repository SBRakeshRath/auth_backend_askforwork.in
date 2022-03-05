var express = require("express");
var router = express.Router();
var createError = require("http-errors");
var csrf = require("csurf");

// error handler
const jsonErrorHandler = async (err, req, res, next) => {
  errSts = err.status || 500;
  code = err.code || 'INTERNAL_ERROR'
  res.status(errSts);
  res.json({ status: errSts, msg: err.message || "no message" , code : code, err: err });
};

router.post("/", function (req, res, next) {
  res.json({ error: "not Allowed Here" });
});

// get csrf token
var csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);
router.get("/", (req, res) => {
  const token = req.csrfToken();
  res.json({ token: token });
});

// api route Listing

router.use("/sessionToken", require("./sessionToken/sessionRoute"));
router.use('/registrationSteps' , require('./registrationSteps/stepsRoute'))
//error
router.use(function (req, res, next) {
  next(createError(404));
});

router.use(jsonErrorHandler);

module.exports = router;
