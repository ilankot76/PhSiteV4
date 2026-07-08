let profiles = [
    { id: "profile1", name: "Profile 1", image: "../imagesfolder/picP1.png", language: "English", rating: "All ages" },
    { id: "profile2", name: "Profile 2", image: "../imagesfolder/picP2.png", language: "English", rating: "All ages" },
    { id: "profile3", name: "Profile 3", image: "../imagesfolder/picP3.png", language: "English", rating: "All ages" },
    { id: "profile4", name: "Profile 4", image: "../imagesfolder/picP4.png", language: "English", rating: "All ages" },
    { id: "profile5", name: "Profile 5", image: "../imagesfolder/picP5.png", language: "English", rating: "All ages" }
];

function getProfiles(req, res) {
    return res.json(profiles);
}

function createProfile(req, res) {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

    if (name === "") {
        return res.status(400).json({ success: false, message: "Please enter a profile name" });
    }

    const newProfile = {
        id: "profile" + (profiles.length + 1),
        name: name,
        image: "../imagesfolder/picP1.png",
        language: "English",
        rating: "All ages"
    };

    profiles.push(newProfile);
    return res.status(201).json({ success: true, message: "Profile created successfully", profile: newProfile });
}

function getProfile(req, res) {
    const profile = profiles.find(function (currentProfile) {
        return currentProfile.id === req.params.id;
    });

    if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found" });
    }

    return res.json(profile);
}

function updateProfile(req, res) {
    const profileIndex = profiles.findIndex(function (profile) {
        return profile.id === req.body.id;
    });

    if (profileIndex === -1) {
        return res.status(404).json({ success: false, message: "Profile not found" });
    }

    profiles[profileIndex] = {
        id: profiles[profileIndex].id,
        name: req.body.name,
        image: req.body.image,
        language: req.body.language,
        rating: req.body.rating
    };

    return res.json({
        success: true,
        message: "Profile updated successfully",
        profile: profiles[profileIndex],
        redirectUrl: "/profiles"
    });
}

module.exports = { getProfiles, createProfile, getProfile, updateProfile };
