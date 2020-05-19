module.exports = {
  address: "127.0.0.1",
  port: process.env.PORT || 5000,
  enviornment: process.env.NODE_ENV,
  production: process.env.NODE_ENV === "production",
  secretTokenKey: process.env.SECRET_KEY,
  maxUserLogins: 10
}