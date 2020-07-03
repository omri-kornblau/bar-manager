const Express = require("express");

const withAuth = require("../middleware/auth").withAuth;

// Imports routes
const AuthRoutes = require("./auth");
const UserRoutes = require("./user");
const ClientRoutes = require("./client");

const router = Express.Router();

router.post("/auth/authenticate", AuthRoutes.login);
router.get("/auth/checktoken", withAuth, AuthRoutes.checkToken);
router.get("/auth/logout", withAuth, AuthRoutes.logout);

router.post("/client/signup", UserRoutes.signupClient);
router.get("/client/get", withAuth, ClientRoutes.getAll);
router.post("/client/newrequest", withAuth, ClientRoutes.createRequest);
router.post("/client/updaterequest", withAuth, ClientRoutes.updateRequest);
router.post("/client/acceptrequest", withAuth, ClientRoutes.acceptRequest);
router.post("/client/cancelrequest", withAuth, ClientRoutes.cancelRequest);
router.get("/client/downloadfile", withAuth, ClientRoutes.downloadFile);
router.post("/client/readnotification", withAuth, ClientRoutes.readNotification);

router.post("/provider/signup", UserRoutes.signupProvider);

module.exports = router;
