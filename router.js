const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");
//router function is to handle all the routes ONLY

router.get("/",controller.renderHomePage);

router.post("/",controller.getWord);

module.exports = router; // export this router module because we need to have app.js as the single entry point
