const comparison = (type, variable) => {
  let result = false;
  type.forEach((element) => {
    if (typeof variable === element) {
      result = true;
    }
  });

  return result;
};

function validateInput(scheme, data) {
  let result = true;
  const validate = Object.keys(scheme).every((sk) => {
    const format = { ...scheme[sk].__format };
    delete scheme[sk].__format;
    // console.log(sk);
    // console.log(format)
    const req_data = Object.keys(data);
    if (format.required) {
      if (!req_data.includes(sk)) {
        // console.log(sk);
        // console.log("not include");
        result = false;
        return false;
      }
    }
    if (!req_data.includes(sk)) return true;

    // format check

    if (!comparison(format.type, data[sk])) {
      // console.log("not format");
      // console.log(format.type, data[sk]);
      return false;
    }

    //
    if (format.type.includes("object"))
      return validateInput(scheme[sk], data[sk]);

    if (format.type === "number" || "string") {
      const value = data[sk];

      //length check

      if (Array.isArray(format.length)) {
        // minimum
        const min = format.length[0];
        const max = format.length[1];
        if (
          !(value.toString().length <= max && value.toString().length >= min)
        ) {
          // console.log(value.toString().length, max, min);
        }
        return (
          value.toString().length <= max && value.toString().length >= min
        );
      } else {
        if (value.toString().length !== format.length) {
          // console.log();
          // console.log(value);
          // console.log(value.toString().length, format.length);
        }

        return value.toString().length === format.length;
      }
    }
    // console.log(result);
    return result;
  });

  return validate;
}
  module.exports = validateInput;
  