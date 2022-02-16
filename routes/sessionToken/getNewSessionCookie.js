const router = require("express").Router();

//firebase auth
const { getAuth } = require("firebase-admin/auth");
const expiresIn = 60 * 60 * 24 * 5 * 1000; //5days

router.post("/", async (req, res, next) => {
  const options = {
    maxAge: expiresIn,
    domain: ".askforwork.in",
  };
  try {
    if (!req.body.idToken) {
      throw { status: 401, message: "no token", code: "ERR_TOKEN" };
      return;
    }

    // const token =
    //   "yJhbGciOiJSUzI1NiIsImtpZCI6ImYyNGYzMTQ4MTk3ZWNlYTUyOTE3YzNmMTgzOGFiNWQ0ODg3ZWEwNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXNrZm9yd29ya3dlYnNpdGUiLCJhdWQiOiJhc2tmb3J3b3Jrd2Vic2l0ZSIsImF1dGhfdGltZSI6MTY0NDkwNjkzOCwidXNlcl9pZCI6IjNaNXFrZEJpcTlnTXlkVkdnNzBLSU1jT2FNRjMiLCJzdWIiOiIzWjVxa2RCaXE5Z015ZFZHZzcwS0lNY09hTUYzIiwiaWF0IjoxNjQ0OTA2OTM4LCJleHAiOjE2NDQ5MTA1MzgsInBob25lX251bWJlciI6IisxMTIzNDU2Nzg5MCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzExMjM0NTY3ODkwIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.rKeBEu1SZYQPl0PPfW7f6aeYrah3SXP38fV9vFxskmE8VPD-WepDb8mxmlM_Mt5md14PVXEWCXgbJRGPrw2ZDb8Qxi1asxel38Z2bmVjzioFHIc0gGCN-Y-b-3TzAX0-et3UFfTFzxH4awRX3N72mkA4DV15a_v9zMhfjyy69iKUu4Uyjmlg0POGbMQOpIkwkt9U4JzgorOsJ3-f5uMKd9K8p7Lt7y8W2jM3SS2vScBkfffx_MNRqYKN9NYhrJz1h_Yb_r4NW54g_DLg4R50br__U2zNFxS-fiiGnqsiCkR_CNuEl4ON41bIM3aeeEQaD8nClU3FqjMG7uQsGVhoIw";

    const token = req.body.idToken.toString();
    await getAuth().verifyIdToken(token, true);

    //create token

    const sessionCookie = await getAuth().createSessionCookie(token, {
      expiresIn,
    });
 
    res.cookie("session", sessionCookie, options);
    res.json({
      code: "SUCCESS",
      message: "Successfully Logged in",
      session: sessionCookie,
    });
  } catch (error) {
    switch (error.code) {
      case "auth/user-disabled":
        next({
          status: 401,
          message: "user disabled, please contact customor support",
          code: "USER_DISABLED",
        });
        break;
      case "auth/argument-error":
        next({
          status: 400,
          message: "something wrong happened, Please relogin",
          code: "ACCESS_TOKEN_INVALID_FORMAT",
        });

        break;
      default:
        next({
          status: 500,
          message: "something wrong happened, Please relogin",
          code: "INTERNAL_ERROR",
        });

        break;
    }
  }
});
module.exports = router;
