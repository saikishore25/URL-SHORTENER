const express = require("express");
const { generateShortURL, getAnalytics, redirectURL, showURL } = require("../controllers/urlController.js");


const router = express.Router();


router.post("/", generateShortURL);
router.get("/analytics/:shortID", getAnalytics);
router.get("/:shortID",redirectURL)
router.get("/all/show", showURL)



module.exports = router;
