const { getAuth } = require("firebase-admin/auth");

async function verifySessionCookie(req, res, next) {
  try {
    if (!req.cookies.session) {
      throw { status: 401, message: "no token", code: "ERR_TOKEN" };
    }
    // verify token
    const sessionCookie = req.cookies.session || "";
    const claims = await getAuth().verifySessionCookie(sessionCookie, true);
    req.app.locals.id = claims.uid;
    req.app.locals.firebaseTokenProvider = claims.firebase.sign_in_provider;
    req.app.locals.tokenClaims = claims;
  } catch (error) {
    next({ status: 401, message: "wrong token", code: "ERR_TOKEN" });

    return;
  }

  next();
}

module.exports = verifySessionCookie;
