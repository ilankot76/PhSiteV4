function login(req, res) {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (username === "" || password === "") {
        return res.status(400).json({ success: false, message: "Please enter your username and password" });
    }

    if (username === "admin" && password === "123456") {
        req.session.user = { id: "admin", username: "admin" };
        return res.json({ success: true, redirectUrl: "/profiles" });
    }

    return res.status(401).json({ success: false, message: "Wrong username or password" });
}

function signup(req, res) {
    const email = req.body.email;
    const username = req.body.username;

    console.log("Received signup data:", { email, username });
    return res.json({ success: true, message: "Signup successful", redirectUrl: "/index" });
}

module.exports = { login, signup };
