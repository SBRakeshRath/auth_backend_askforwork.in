const router = require("express").Router();
const verifySessionCookie = require("./../g-middleWares/verifySessionCookie");
const createNewUserData = require("./middlewares/createNewUserData");
const { getAuth } = require("firebase-admin/auth");

// router.use(require())
router.post(
  "/",
  verifySessionCookie,
  createNewUserData,
  async (req, res, next) => {
    const fdb = req.app.get("fdb");
    try {
      // read Data
      const cityRef = fdb.collection("userProfileData").doc(req.app.locals.id);
      const doc = await cityRef.get();
      if (!doc.exists) {
        throw {
          status: 500,
          message: "something wrong happened, Please relogin",
          code: "INTERNAL_ERROR",
        };
      }
      // create custom Token
      const token = await getAuth().createCustomToken(req.app.locals.id, {
        tokenType: "newUserStep",
      });
      res.json({ userData: doc.data(), token: token });
    } catch (error) {
      next({
        status: 500,
        message: "something wrong happened, Please relogin",
        code: "INTERNAL_ERROR",
      });
    }
  }
);
module.exports = router;
