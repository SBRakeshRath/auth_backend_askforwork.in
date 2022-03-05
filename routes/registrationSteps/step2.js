const router = require("express").Router();
const updateUserData = require("./../../db/userData/updateUserData");
const validateInput = require("./../g-middleWares/validateFormat");

router.post("/stepTwo", async (req, res, next) => {
  const inputs = {
    dob: {
      __format: {
        type: ["object"],
        required: true,
      },
      year: {
        __format: {
          type: ["number"],
          required: true,
          length: 4,
        },
      },
      month: {
        __format: {
          type: ["number"],
          required: true,
          length: [1, 2],
        },
      },
      date: {
        __format: {
          type: ["number"],
          required: true,
          length: [1, 2],
        },
      },
    },
    bio: {
      __format: {
        type: ["string"],
        required: false,
        length: [0, 50],
      },
    },
  };

  add = true;

  if (req.app.locals.stepInfo.step !== 2) {
    next({ status: 401, code: "WRONG_PLACE" });
    return;
  }

  // validate Input

  // check age

  function getAge(year, month, date) {
    var today = new Date();
    var birthDate = new Date(year, month, date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  if (
    !validateInput(inputs, req.body) ||
    getAge(req.body.dob.year, req.body.dob.month, req.body.dob.date) < 18
  ) {
    next({ status: 400, code: "INVALID_DATA" });

    return;
  }
  const reqData = req.body;

  try {
    await updateUserData(req, {
      dob: reqData.dob,
      bio: reqData.bio || "I am very good at my work.",
      additional: {
        step: true,
        disabled_cause: "REGISTRATION_STEP_NOT_COMPLETED",
      },
      account_disabled: false,
    });

    res.json({ code: "SUCCESS" });
  } catch (error) {
    next({ message: "invalid format" });
  }
});

module.exports = router;
