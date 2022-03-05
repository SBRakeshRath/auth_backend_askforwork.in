const validateUSerDataFormat = require("./validateUserDataFormat");

async function updateUserData(req, data) {
  const fdb = req.app.get("fdb");

  const userDataRef = fdb.collection("userProfileData").doc(req.app.locals.id);

  try {
    if (!validateUSerDataFormat(data)) {
      throw { code: " INVALID_FORMAT" };
    }
    await userDataRef.update(data);
  } catch (error) {
    throw error;
  }
}

module.exports = updateUserData;
