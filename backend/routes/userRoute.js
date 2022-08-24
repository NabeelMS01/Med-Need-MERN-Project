const express = require("express");

const router = express.Router();

const { createAccount, authUser,verify,getallusers } = require("../controllers/Controllers");
router.post("/create-account", getallusers);
router.post("/create-account", createAccount);
router.post("/login",verify, authUser);

module.exports = router;
