const allowed_origins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origins;

  if (allowed_origins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", true);
  }
  next();
};
module.exports = credentials;
