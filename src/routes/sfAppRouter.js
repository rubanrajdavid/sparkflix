const express = require('express')
const controller = require("../controllers/sfAppController");
const router = express.Router()

router.get("/", controller.moviesPageRender);
router.get("/createscreen", controller.createScreenPageRender);
router.get("/screens", controller.screensPageRender);

router.get("/movie/:mID", controller.movieStream);



module.exports = router