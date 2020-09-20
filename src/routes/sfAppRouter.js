const express = require('express')
const controller = require("../controllers/sfAppController");
const router = express.Router()

router.get("/", controller.moviesPageRender);
router.get("/createscreen", controller.createScreenPageRender);
router.get("/screens", controller.screensPageRender);

// router.get("/sample", controller.sampleRender)
// router.get("/samplevideo/:mID", controller.sample)

router.get("/movie/:mID", controller.movieStreamPageRender);
router.get("/moviestream/:mID", controller.movieStream);

router.get("/screen/:sID", controller.screenStreamRender);


module.exports = router