const Express = require("express");

const withAuth = require("../middleware/auth").withAuth;

const {
  clientChange,
  isClientChange,
  providerChange,
  isProviderChange,
  isRequestChange,
} = require("../middleware/lastChange");

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
router.get("/client/get", withAuth, isClientChange, ClientRoutes.getAll);
router.get("/client/messages", withAuth, isClientChange, ClientRoutes.getMessages);
router.get("/client/downloadfile", withAuth, ClientRoutes.downloadFile);
router.post("/client/updatedetailes", withAuth, clientChange, ClientRoutes.updatesDetailes);
router.post("/client/newrequest", withAuth, clientChange, ClientRoutes.createRequest);
router.post("/client/updaterequest", withAuth, clientChange, ClientRoutes.updateRequest);
router.post("/client/cancelrequest", withAuth, clientChange, ClientRoutes.cancelRequest);
router.post("/client/deletefile", withAuth, clientChange, ClientRoutes.deleteFile);
router.post("/client/readnotification", withAuth, clientChange, ClientRoutes.readNotification);
router.post("/client/sendmessage", withAuth, clientChange, ClientRoutes.sendMessage);
router.post("/client/updatenotificationsettings", withAuth, clientChange, ClientRoutes.updatesNotificationSettings);

router.post("/provider/signup", UserRoutes.signupProvider);
router.get("/provider/get", withAuth, isProviderChange, ProviderRoutes.getAll);
router.get("/provider/fetchrequest", withAuth, isRequestChange, ProviderRoutes.fetchRequest);
router.get("/provider/downloadfile", withAuth, ProviderRoutes.downloadFile);
router.post("/provider/updatedetailes", withAuth, providerChange, ProviderRoutes.updatesDetailes);
router.post("/provider/filteredrequests", withAuth, ProviderRoutes.getRequests);
router.post("/provider/setoffer", withAuth, providerChange, ProviderRoutes.setOffer);
router.post("/provider/sendmessage", withAuth, providerChange, ProviderRoutes.sendMessage);
router.post("/provider/readnotification", withAuth, providerChange, ProviderRoutes.readNotification);
router.post("/provider/updatenotificationsettings", withAuth, providerChange, ProviderRoutes.updatesNotificationSettings);

module.exports = router;
