//handle adding data to db
const newUserDataSet = require("../../../db/db.jsx").createNewUserData;
async function createNewUserData(req, res, next) {
  let userData = {};

  switch (req.app.locals.firebaseTokenProvider) {
    case "phone":
      userData = {
        ...userData,
        phoneNo: req.app.locals.tokenClaims.phone_number,
        phoneNo_verified: true,
        additional: {
          step: 1,
          disabled_cause: "REGISTRATION_STEP_NOT_COMPLETED",
        },
      };
      break;

    default:
      break;
  }
  try {
    await newUserDataSet(req, userData);
    next();
  } catch (error) {
    // console.log(error)
    next({
      status: 500,
      message: "something wrong happened, Please relogin",
      code: "INTERNAL_ERROR",
    });
  }
}
module.exports = createNewUserData;
