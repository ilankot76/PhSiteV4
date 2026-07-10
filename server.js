require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "very-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(pageRoutes);
app.use(postRoutes);
app.use(profileRoutes);
app.use(authRoutes);

async function startServer() {
    await connectDB();

    app.listen(PORT, function () {
        console.log("Server is running on http://localhost:" + PORT);
    });
}

startServer();
