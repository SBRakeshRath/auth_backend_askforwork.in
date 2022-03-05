const router = require("express").Router();

router.use(require("./../g-middleWares/verifySessionCookie"));
router.use(async (req, res, next) => {
  const fdb = req.app.get("fdb");

  try {
    const udRef = fdb.collection("userProfileData").doc(req.app.locals.id);
    const doc = await udRef.get();
    if (!doc.exists) {
      throw { status: 401, message: "no user data", code: "NO_DATA" };
    }
    const data = doc.data();

    if (!data.additional.step) {
      throw {
        status: 401,
        message: "no step pending",
        code: "NO_STEP_PENDING",
      };
    }

    req.app.locals.stepInfo = data.additional;
    next();
  } catch (error) {
    // console.log(error);
    switch (error.code) {
      case "NO_DATA":
        next(error);
        break;
      case "NO_STEP_PENDING":
        next(error);
        break;
      default:
        next({ message: "internal error" });
        break;
    }
  }
});
router.use("/", require("./step1"));
router.use("/", require("./step2"));


module.exports = router;
