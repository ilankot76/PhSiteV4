const MAX_POSTS_DISPLAYED = 15;

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("profile") || "profile1";
    await loadSelectedProfile(profileId);

    const feedData = await fetchFeed(profileId);

    const divsWithId = document.querySelectorAll("#content > div[id]");
    const searchInput = document.getElementById("input_search");
    const alphabetFilter = document.getElementById("alphabet-filter");
    let selectedLetter = "";

    function renderFeed(data) {
        for (let i = 0; i < divsWithId.length; i++) {
            displayFeed(divsWithId[i].id, getPostsForSection(divsWithId[i].id, data));
        }
    }

    function filterFeed() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const filteredData = feedData.filter(function (item) {
            const matchesSearch = item.name.toLowerCase().includes(query);
            const matchesLetter = selectedLetter === "" || item.name.toUpperCase().startsWith(selectedLetter);

            return matchesSearch && matchesLetter;
        });

        renderFeed(filteredData);
    }

    createAlphabetFilter(alphabetFilter, function (letter) {
        selectedLetter = letter;
        filterFeed();
    });

    renderFeed(feedData);

    if (searchInput) {
        searchInput.addEventListener("input", filterFeed);
    }
});



async function loadSelectedProfile(profileId) {
    const profileResponse = await fetch("/api/profiles/" + encodeURIComponent(profileId));

    if (!profileResponse.ok) {
        return;
    }

    const profile = await profileResponse.json();
    const navProfileImage = document.getElementById("nav-profile-image");

    if (navProfileImage) {
        navProfileImage.src = profile.image;
        navProfileImage.alt = profile.name;
    }
}

async function fetchFeed(profileId) {
    try {
        const response = await fetch("/api/feed/" + encodeURIComponent(profileId));

        if (!response.ok) {
            return [];
        }

        const feedData = await response.json();
        return feedData;
    } catch (error) {
        console.error("Error fetching feed data:", error);
        return [];
    }
}

function createAlphabetFilter(container, onLetterClick) {
    if (!container) {
        return;
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    container.innerHTML = "";
    container.appendChild(createAlphabetButton("All", "", true, onLetterClick));

    for (let i = 0; i < letters.length; i++) {
        container.appendChild(createAlphabetButton(letters[i], letters[i], false, onLetterClick));
    }
}

function createAlphabetButton(label, letter, active, onLetterClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = active ? "alphabet-btn active" : "alphabet-btn";

    button.addEventListener("click", function () {
        const buttons = button.parentElement.querySelectorAll(".alphabet-btn");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        button.classList.add("active");
        onLetterClick(letter);
    });

    return button;
}

function displayFeed(divId, feedData) {
    const container = document.getElementById(divId);

    if (!container) {
        return;
    }

    const oldCards = container.querySelectorAll(".Data_card");

    for (let i = 0; i < oldCards.length; i++) {
        oldCards[i].remove();
    }

    const postsToDisplay = feedData.slice(0, MAX_POSTS_DISPLAYED);

    for (let i = 0; i < postsToDisplay.length; i++) {
        const post = postsToDisplay[i];
        const card = createCard(post);

        container.appendChild(card);
    }
}

function getPostsForSection(divId, feedData) {
    if (divId === "continue-watching") {
        return feedData.filter(function (item) {
            return item.stoppedWatchingAt !== "0:0";
        });
    }

    if (divId === "Top10") {
        return feedData.filter(function (item) {
            return item.top10 === true;
        });
    }

    if (divId === "RealTv") {
        return feedData.filter(function (item) {
            return item.type === "reality tv";
        });
    }

    if (divId === "DramaTV") {
        return feedData.filter(function (item) {
            return item.type === "drama tv";
        });
    }

    if (divId === "horror") {
        return feedData.filter(function (item) {
            return item.type === "horror";
        });
    }

    if (divId === "comedy") {
        return feedData.filter(function (item) {
            return item.type === "comedy";
        });
    }

    if (divId === "scifi") {
        return feedData.filter(function (item) {
            return item.type === "scifi";
        });
    }

    return feedData;
}

function formatStoppedWatchingAt(stoppedWatchingAt) {
    if (stoppedWatchingAt === "0:0") {
        return "Not watched";
    }

    const stoppedAtParts = stoppedWatchingAt.match(/^(\d+),(\d+)\s+(\d{1,2}:\d{2})$/);

    if (!stoppedAtParts) {
        return stoppedWatchingAt;
    }

    return `Episode ${stoppedAtParts[1]}, Season ${stoppedAtParts[2]}, ${stoppedAtParts[3]}`;
}

function createCard(item) {
    const card = document.createElement("div");

    card.className = "Data_card";

    item.liked = Boolean(item.liked);
    item.top10 = Boolean(item.top10);

    card.innerHTML = `
        <img src="../scripts/${item.preview}" class="feed-card-image" alt="${item.name}">
        <div class="feed-card-body">
            <h5 class="feed-card-title">${item.name}</h5>
            <p>${item.length}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Likes:</strong> <span class="likes">${item.likes}</span> <strong>Rating:</strong> ${item.rating}</p>
            <button class="like-btn${item.liked ? " liked" : ""}" type="button">${item.liked ? "Unlike" : "Like"}</button>
        </div>
    `;

    
    const likeBtn = card.querySelector(".like-btn");
    const likesText = card.querySelector(".likes");
    const likedStatus = card.querySelector(".liked-status");
    const image = card.querySelector(".feed-card-image");

    image.addEventListener("error", function () {
        image.remove();
    });

    likeBtn.addEventListener("click", function () {
        item.liked = !item.liked;
        item.likes += item.liked ? 1 : -1;
        likesText.textContent = item.likes;
        if (likedStatus) {
            likedStatus.textContent = item.liked ? "Yes" : "No";
        }
        likeBtn.textContent = item.liked ? "Unlike" : "Like";
        likeBtn.classList.toggle("liked", item.liked);
        likeBtn.classList.remove("pressed");
        void likeBtn.offsetWidth;
        likeBtn.classList.add("pressed");
    });

    return card;
}
