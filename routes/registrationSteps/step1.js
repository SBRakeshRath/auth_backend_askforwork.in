const router = require("express").Router();
const updateUserData = require("./../../db/userData/updateUserData");

router.post("/", async (req, res, next) => {
  const inputs = ["fName", "lName", "mName"];

  add = true;

  if(req.app.locals.stepInfo.step !== 1 ) {
    next({ status: 401, code: "WRONG_PLACE" });
    return;
  }

  inputs.forEach((keys) => {
    if (!Object.keys(req.body).includes(keys)) {
      add = false;
    }
  });
  if (!add) {
    next({ status: 400, code: "INCOMPLETE_DATA" });
    return;
  }
  inputs.forEach((input) => {
    el = req.body[input];

    if (!add) return;

    if (typeof el !== "string") {
      add = false;
      return;
    }


    if (input !== "mName") {

      add = el.trim() !== "";
    }
  });

  if (!add) {
    next({ status: 400, code: "INVALID_DATA_FORMAT" });
    return;
  }

  try {
    await updateUserData(req, {
      name: {
        fName: req.body.fName,
        lName: req.body.lName,
        mName: req.body.mName,
      },
      additional : {
          step : 2,
          disabled_cause: "REGISTRATION_STEP_NOT_COMPLETED",
      }
    });

  res.json({ "code": "SUCCESS" });

  } catch (error) {
      next({message : "invalid format"})
  }

});

module.exports = router;
