const Express = require("express");

const withAuth = require("../middleware/auth").withAuth;

// Imports routes
const AuthRoutes = require("./auth");
const UserRoutes = require("./user");

const router = Express.Router();

router.post("/auth/authenticate", AuthRoutes.login);
router.get("/auth/checktoken", withAuth, AuthRoutes.checkToken);
router.get("/auth/logout", withAuth, AuthRoutes.logout)

router.post("/client/signup", UserRoutes.signupClient)
router.get("/client/get", withAuth, UserRoutes.getAll)

router.post("/provider/signup", UserRoutes.signupProvider)

module.exports = router;
