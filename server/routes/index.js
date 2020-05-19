const Express = require("express");

const withAuth = require("../middleware/auth").withAuth;

// Imports routes
const AuthRoutes = require("./auth");

const router = Express.Router();

router.post("/auth/authenticate", AuthRoutes.register);
router.get("/auth/checktoken", withAuth, AuthRoutes.checkToken);
router.get("/auth/logout", withAuth, AuthRoutes.logout)

module.exports = router;