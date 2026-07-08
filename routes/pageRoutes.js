const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/", pageController.showIndex);
router.get("/index", pageController.showIndex);
router.get("/profiles", pageController.showProfiles);
router.get("/main", pageController.showMain);
router.get("/signup", pageController.showSignup);
router.get("/manage-profiles", pageController.showManageProfiles);
router.get("/api/feed/:profileId", function (req, res) {
    res.redirect(307, "/posts");
});

module.exports = router;
