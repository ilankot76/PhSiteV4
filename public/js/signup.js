async function signup() {
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const terms = document.getElementById("terms");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || username === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields");
        return;
    }

    if (!regexEmail.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    if (!terms.checked) {
        alert("You must agree to the terms and conditions");
        return;
    }

    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    });

    const result = await response.json();

    if(result.success) {
        alert(result.message);
        window.location.href = result.redirectUrl ;
    }   else {
        alert("account already exists");
    }






    alert("Signup successful");
    window.location.href = "index.html";
}

