const express = require("express");
const router = express.Router();
const admin = require("./admin");
const intern = require("./internship");
const job = require("./job");
const application = require("./application")
const upload = require("./uploadRoute");

router.use("/admin", admin);
router.use("/internship", intern);
router.use("/job", job);
router.use("/application", application);
router.use("/upload", upload);


module.exports = router;
