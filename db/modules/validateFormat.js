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
  