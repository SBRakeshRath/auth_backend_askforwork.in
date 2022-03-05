const demo = {
  bio: "I am very good at my job. ",
  name: "unknown",
  profilePhoto: "https://picsum.photos/200",
  dob: {
    month: false,
    year: false,
    date: false,
  },
  loading: true,
  email: false,
  email_verified: false,
  phoneNo: "+11234567890",
  phoneNo_verified: true,
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY0NjA2MzAyOSwiZXhwIjoxNjQ2MDY2NjI5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15bXJrb0Bhc2tmb3J3b3Jrd2Vic2l0ZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXltcmtvQGFza2Zvcndvcmt3ZWJzaXRlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiM1o1cWtkQmlxOWdNeWRWR2c3MEtJTWNPYU1GMyIsImNsYWltcyI6eyJ0b2tlblR5cGUiOiJuZXdVc2VyU3RlcCJ9fQ.lQUr9X1kzWTIRBaR1fllVxXnShk7oETeu8kv5DdqflXIwb-CmMLeRpRMM0uSjsIYF5RlFeE_WXKyTQ1ElCJ0VzNdBMI39ja0OUXLchWXmJRTDM9E50bMr4fMxvxzSQiUsrXhtksUurT3RNEQlMWDMfqA27LHAv8o0Ly_egoepmW3AbAqBMgMG95yLMcbGD8m4uE4UFBmcvVWK03ETs1Y0FD8ajoxOgAKjMgdCtFI7P92512aqD-n8JDQ2C7WUvG_CujGwBSOaSoiJuqjEhDan-ObxEV6eOxDrQoyb_8Tr-uAohGMxQXxKD02DYMDyCvyZnMlKL_3qt5FNzpJaXMp_A",
  additional: {
    disabled_cause: "REGISTRATION_STEP_NOT_COMPLETED",
    step: 1,
  },
  account_disabled: true,
};
const scheme = require("./userDataScheme.json");

const comaprision = (type, variable) => {
  // switch (type) {
  //   case 'string':

  //     break;

  //   default:
  //     break;
  // }

  return typeof variable === type;
};

function validateUSerDataFormat(data) {
  // console.log("calling");
  if (!typeof data === "object") return false;
  let validated = true;

  function deepSchemeComparision(cData, cScheme) {
    // console.log("__________LAP");
    if (!validated) return false;
    if (Object.keys(cScheme).includes("__format")) {
      delete cScheme.__format;
    }
    // console.log(Object.keys(cScheme));

    // for each loop for cData
    Object.keys(cData).forEach((dk) => {
      //check key includes or not
      if (!validated) return;
      if (!Object.keys(cScheme).includes(dk)) {
        validated = false;
        return;
      }
      //check format

      //any format
      if (cScheme[dk].__format === "any") return;

      // array format
      // console.log(cScheme[dk]__fromat)

      let arrayCont = true;

      if (Array.isArray(cScheme[dk].__format)) {
        arrayCont = false;
        cScheme[dk].__format.forEach((format) => {
          if (comaprision(format, cData[dk])) {
            arrayCont = true;

            return;
          }
        });
      }

      if (!arrayCont) {
        // console.log(1);
        // console.log(cScheme[dk].__format, cData[dk]);
        validated = false;
        return;
      }
      // check type
      if (typeof cScheme[dk].__format === "string") {
        if (!comaprision(cScheme[dk].__format, cData[dk])) {
          // console.log(cScheme[dk].__format, cData[dk]);
          // console.log(2);

          validated = false;
          return;
        }
      }
      // console.log("________________");
      // console.log(cScheme[dk], cData[dk]);

      // console.log(dk);
      // console.log(validated);

      // object type

      if (typeof cData[dk] === "object") {
        // console.log(deepSchemeComparision(cData[dk], cScheme[dk]))
        validated = deepSchemeComparision(cData[dk], cScheme[dk]);
      }
    });
    return validated;
  }
  // console.log(deepSchemeComparision(data, scheme));

  return deepSchemeComparision(data, scheme);
  // return false;
}

module.exports = validateUSerDataFormat;
