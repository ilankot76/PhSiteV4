const path = require("path");

const viewsFolder = path.join(__dirname, "..", "views");

function sendPage(fileName) {
    return function (req, res) {
        res.sendFile(path.join(viewsFolder, fileName));
    };
}

module.exports = {
    showIndex: sendPage("index.html"),
    showProfiles: sendPage("profiles.html"),
    showMain: sendPage("feed.html"),
    showSignup: sendPage("signup.html"),
    showManageProfiles: sendPage("manage-profiles.html")
};