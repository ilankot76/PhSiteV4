const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

router.get("/api/profiles", profileController.getProfiles);
router.post("/api/profiles", profileController.createProfile);
router.get("/api/profiles/:id", profileController.getProfile);
router.post("/manage-profiles", profileController.updateProfile);

module.exports = router;
