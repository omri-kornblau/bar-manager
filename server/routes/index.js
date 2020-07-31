const Express = require("express");

const withAuth = require("../middleware/auth").withAuth;

// Imports routes
const AuthRoutes = require("./auth");
const UserRoutes = require("./user");
const ClientRoutes = require("./client");
const ProviderRoutes = require("./provider");

const router = Express.Router();

router.post("/auth/authenticate", AuthRoutes.login);
router.get("/auth/checktoken", withAuth, AuthRoutes.checkToken);
router.get("/auth/logout", withAuth, AuthRoutes.logout);
router.post("/auth/changepassword", withAuth, AuthRoutes.changePassword);

router.post("/client/signup", UserRoutes.signupClient);
router.post("/client/updatedetailes", withAuth, ClientRoutes.updatesDetailes);
router.get("/client/get", withAuth, ClientRoutes.getAll);
router.post("/client/newrequest", withAuth, ClientRoutes.createRequest);
router.post("/client/updaterequest", withAuth, ClientRoutes.updateRequest);
router.post("/client/cancelrequest", withAuth, ClientRoutes.cancelRequest);
router.get("/client/downloadfile", withAuth, ClientRoutes.downloadFile);
router.post("/client/deletefile", withAuth, ClientRoutes.deleteFile);
router.post("/client/readnotification", withAuth, ClientRoutes.readNotification);
router.post("/client/sendmessage", withAuth, ClientRoutes.sendMessage);
router.get("/client/messages", withAuth, ClientRoutes.getMessages);

router.post("/provider/signup", UserRoutes.signupProvider);
router.post("/provider/updatedetailes", withAuth, ProviderRoutes.updatesDetailes);
router.get("/provider/get", withAuth, ProviderRoutes.getAll);
router.post("/provider/filteredrequests", withAuth, ProviderRoutes.getRequests);
router.post("/provider/setoffer", withAuth, ProviderRoutes.setOffer);
router.post("/provider/sendmessage", withAuth, ProviderRoutes.sendMessage);
router.get("/provider/fetchrequest", withAuth, ProviderRoutes.fetchRequest);
router.get("/provider/downloadfile", withAuth, ProviderRoutes.downloadFile);
router.post("/provider/readnotification", withAuth, ProviderRoutes.readNotification);

module.exports = router;
