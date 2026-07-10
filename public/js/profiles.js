document.addEventListener("DOMContentLoaded", async function () {
    const profilesContainer = document.getElementById("profiles-container");
    const addButton = document.getElementById("add-profile");
    const manageButton = document.getElementById("manage-profiles");
    const response = await fetch("/api/profiles");
    const profiles = await response.json();

    function addProfileCard(profile) {
        profilesContainer.append(createProfileCard(profile));
    }

    profiles.forEach(function (profile) {
        addProfileCard(profile);
    });

    addButton.addEventListener("click", async function () {
        const profileName = prompt("Enter profile name", "Profile " + (profiles.length + 1));

        if (profileName === null) {
            return;
        }

        const trimmedName = profileName.trim();

        if (trimmedName === "") {
            alert("Please enter a profile name");
            return;
        }

        const createResponse = await fetch("/api/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: trimmedName
            })
        });

        const result = await createResponse.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        profiles.push(result.profile);
        addProfileCard(result.profile);
    });

    manageButton.addEventListener("click", function () {
        const isManaging = profilesContainer.classList.toggle("is-managing");
        manageButton.setAttribute("aria-pressed", String(isManaging));
        manageButton.textContent = isManaging ? "done" : "manage profiles";
    });
});

function createProfileCard(profile) {
    const card = document.createElement("article");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const name = document.createElement("p");
    const editButton = document.createElement("button");

    card.className = "profile-card";
    link.className = "profile-link";
    link.href = "/main?profile=" + encodeURIComponent(profile.id);

    image.className = "profile-image";
    image.src = profile.image;
    image.alt = profile.name;

    name.className = "profile-name";
    name.textContent = profile.name;

    editButton.className = "edit-profile-button";
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        window.location.href = "/manage-profiles?profile=" + encodeURIComponent(profile.id);
    });

    link.append(image, name);
    card.append(link, editButton);

    return card;
}
