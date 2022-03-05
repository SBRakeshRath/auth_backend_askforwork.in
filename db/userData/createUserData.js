// import { doc, setDoc } from "firebase/firestore";
const dataFormat = {
  bio: "I am very good at my job. ",
  name: { fName: false, lName: false, mName: false },
  profilePhoto: "https://picsum.photos/200",
  dob: {
    date: false,
    month: false,
    year: false,
  },
  email: false,
  email_verified: false,
  phoneNo: false,
  phoneNo_verified: false,
  account_disabled: true,
  additional: {},
};
const validateUSerDataFormat = require("./validateUserDataFormat");
async function createNewUserData(req, additional) {
  const fdb = req.app.get("fdb");
  try {
    // read Data
    const cityRef = fdb.collection("userProfileData").doc(req.app.locals.id);
    const doc = await cityRef.get();
    if (doc.exists) {
      return;
    }
    //validate format

    if (
      !validateUSerDataFormat({
        ...dataFormat,
        ...additional,
      })
    ) {
      throw { code: " INVALID_FORMAT" };
    }
    await fdb
      .collection("userProfileData")
      .doc(req.app.locals.id)
      .set({
        ...dataFormat,
        ...additional,
      });
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewUserData };
