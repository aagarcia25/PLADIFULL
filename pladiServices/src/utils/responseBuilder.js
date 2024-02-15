const db = require("../../config/db.js");

const buildResponse = (response, success, numCode, strMessage) => ({
  RESPONSE: response,
  SUCCESS: success,
  NUMCODE: numCode,
  STRMESSAGE: strMessage,
});

function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports = {
  buildResponse,
  executeQuery,
};
