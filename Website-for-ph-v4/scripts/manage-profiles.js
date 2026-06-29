document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("profile") || "profile1";

    const response = await fetch("/api/profiles/" + encodeURIComponent(profileId));

    if (!response.ok) {
        window.location.href = "/profiles";
        return;
    }

    const profile = await response.json();

    const profileIdInput = document.getElementById("profile-id");
    const profileNameInput = document.getElementById("profile-name");
    const pictureSelect = document.getElementById("profile-picture");
    const languageSelect = document.getElementById("profile-language");
    const ratingSelect = document.getElementById("profile-rating");
    const previewImage = document.getElementById("profile-preview");
    const editorTitle = document.getElementById("editor-title");
    const form = document.getElementById("profile-form");

    function getSelectedPicture() {
        return pictureSelect.value;
    }

    function updatePreview() {
        previewImage.src = getSelectedPicture();
    }

    profileIdInput.value = profile.id;
    profileNameInput.value = profile.name;
    pictureSelect.value = profile.image;
    languageSelect.value = profile.language;
    ratingSelect.value = profile.rating;

    editorTitle.textContent = "Edit " + profile.name;


    pictureSelect.addEventListener("change", function () {
        updatePreview();
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const profileName = profileNameInput.value.trim();

        if (profileName === "") {
            alert("Please enter a profile name");
            return;
        }

        const saveResponse = await fetch("/manage-profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: profile.id,
                name: profileName,
                image: getSelectedPicture(),
                language: languageSelect.value,
                rating: ratingSelect.value
            })
        });

        const result = await saveResponse.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        window.location.href = result.redirectUrl;
    });
});
