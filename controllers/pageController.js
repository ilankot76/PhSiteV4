const path = require("path");

const publicFolder = path.join(__dirname, "..", "Website-for-ph-v4");
const htmlFolder = path.join(publicFolder, "Website-for-ph");
const viewsFolder = path.join(__dirname, "..", "views");

function sendPage(fileName) {
    return function (req, res) {
        res.sendFile(path.join(htmlFolder, fileName));
    };
}

module.exports = {
    publicFolder,
    showIndex: sendPage("index.html"),
    showProfiles: sendPage("profiles.html"),
    showMain: function (req, res) {
        res.sendFile(path.join(viewsFolder, "feed.html"));
    },
    showSignup: sendPage("signup.html"),
    showManageProfiles: sendPage("manage-profiles.html")
};
