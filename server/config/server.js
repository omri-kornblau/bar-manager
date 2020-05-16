module.exports = {
  port: process.env.PORT,
  enviornment: process.env.NODE_ENV,
  production: process.env.NODE_ENV === "production",
  secretTokenKey: process.env.SECRET_KEY,
  maxUserLogins: 10
}