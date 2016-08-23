console.log("using prod variables");

module.exports = {
  "DATABASE_URI": process.env.MONGODB_URI,
  "FRONTEND_ORIGIN": process.env.FRONTEND_ORIGIN,
}