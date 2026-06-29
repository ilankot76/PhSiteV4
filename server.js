require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name:"sessionId",
    secret: process.env.SESSION_SECRET || "very-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000*60*30 //should be 30 min i think
    }
}));

const publicFolder = path.join(__dirname, "Website-for-ph-v3");
const feedItems = require(path.join(publicFolder, "scripts", "Feed.json"));

app.use(express.static(publicFolder));
app.use(postRoutes);

let profiles = [
    {
        id: "profile1",
        name: "Profile 1",
        image: "../imagesfolder/picP1.png",
        language: "English",
        rating: "All ages",
    },
    {
        id: "profile2",
        name: "Profile 2",
        image: "../imagesfolder/picP2.png",
        language: "English",
        rating: "All ages",
    },
    {
        id: "profile3",
        name: "Profile 3",
        image: "../imagesfolder/picP3.png",
        language: "English",
        rating: "All ages",
    },
    {
        id: "profile4",
        name: "Profile 4",
        image: "../imagesfolder/picP4.png",
        language: "English",
        rating: "All ages",
    },
    {
        id: "profile5",
        name: "Profile 5",
        image: "../imagesfolder/picP5.png",
        language: "English",
        rating: "All ages",
    }
];

function createFeedForProfile() {
    return feedItems.map(function (item) {
        return { ...item };
    });
}

let feedsByProfileId = {};

for (let i = 0; i < profiles.length; i++) {
    feedsByProfileId[profiles[i].id] = createFeedForProfile();
}

app.get("/", function (req, res) {
  res.sendFile(path.join(publicFolder, "Website-for-ph", "index.html"));
});

app.get("/index", function (req, res) {
    res.sendFile(path.join(publicFolder, "Website-for-ph", "index.html"));
});

app.get("/profiles", function (req, res) {
    res.sendFile(path.join(publicFolder, "Website-for-ph", "profiles.html"));
});

app.get("/main", function (req, res) {
    res.sendFile(path.join(publicFolder, "Website-for-ph", "main.html"));
});

app.get("/signup", function (req, res) {
    res.sendFile(path.join(publicFolder, "Website-for-ph", "signup.html"));
});

app.get("/manage-profiles", function (req, res) {
    res.sendFile(path.join(publicFolder, "Website-for-ph", "manage-profiles.html"));
});

app.get("/api/profiles", function (req, res) {
    res.json(profiles);
});

app.post("/api/profiles", function (req, res) {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";

    if (name === "") {
        return res.status(400).json({
            success: false,
            message: "Please enter a profile name"
        });
    }

    const profileId = "profile" + (profiles.length + 1);
    const newProfile = {
        id: profileId,
        name: name,
        image: "../imagesfolder/picP1.png",
        language: "English",
        rating: "All ages"
    };

    profiles.push(newProfile);
    feedsByProfileId[profileId] = createFeedForProfile();

    return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        profile: newProfile
    });
});

app.get("/api/profiles/:id", function (req, res) {
    const profile = profiles.find(function (currentProfile) {
        return currentProfile.id === req.params.id;
    });

    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"// womp womp
        });
    }

    return res.json(profile);
});

app.get("/api/feed/:profileId", function (req, res) {
    const profileExists = profiles.some(function (profile) {
        return profile.id === req.params.profileId;
    });

    if (!profileExists) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        });
    }

    if (!feedsByProfileId[req.params.profileId]) {
        feedsByProfileId[req.params.profileId] = createFeedForProfile();
    }

    return res.json(feedsByProfileId[req.params.profileId]);
});

app.post("/login", function (req, res) {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (username === "" || password === "") {
        return res.status(400).json({
            success: false,
            message: "Please enter your username and password"
        });
    }

    if (username === "admin" && password === "123456") {
        req.session.user = {
            id:"admin",
            username: "admin"
        };

            return res.json({

            success: true,
           redirectUrl: "/profiles"
        });
    }

   return res.status(401).json({
        success: false,
        message: "Wrong username or password"
    });
});

app.post("/signup", function (req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("Received signup data:", { email, username, password });

    res.json({
        success: true,
        message: "Signup successful",
        redirectUrl: "/index"
    });
});

app.post("/manage-profiles", function (req, res) {
    const profileIndex = profiles.findIndex(function (profile) {
        return profile.id === req.body.id;
    });

    if (profileIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Profile not found"
        });
    }

    profiles[profileIndex] = {
        id: profiles[profileIndex].id,
        name: req.body.name,
        image: req.body.image,
        language: req.body.language,
        rating: req.body.rating,
    };

    res.json({
        success: true,
        message: "Profile updated successfully",
        profile: profiles[profileIndex],
        redirectUrl: "/profiles"
    });
});




async function startServer() {
    await connectDB();

    app.listen(PORT, function () {
        console.log("Server is running on http://localhost:" + PORT);
    });
}

startServer();

