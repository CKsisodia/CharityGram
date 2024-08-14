const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { validateToken } = require("../middlewares/auth");

router.post("/signup", authController.userSignUp);
router.post("/login", authController.userLogin);
router.post("/refresh", authController.getRefreshToken);
router.get("/get-info", validateToken, authController.getInfo);

module.exports = router;