function showLoginMessage(message) {
    const messageBox = document.getElementById("login-message");

    if (messageBox) {
        messageBox.textContent = message;
    }
}

async function auth() {
    const inputUsername = document.getElementById("username").value.trim();
    const inputPassword = document.getElementById("password").value;

    showLoginMessage("");

    if (inputUsername === "" || inputPassword === "") {
        showLoginMessage("Please enter your username and password");
        return;
    }

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: inputUsername,
            password: inputPassword
        })
    });

    const result = await response.json();

    if (result.success) {
        window.location.href = result.redirectUrl;
    } else {
        showLoginMessage(result.message);
    }
}
