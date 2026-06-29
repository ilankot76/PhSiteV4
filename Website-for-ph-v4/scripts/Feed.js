document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("profile") || "profile1";
    await loadSelectedProfile(profileId);

    const searchInput = document.getElementById("input_search");
    let posts = await fetchPosts();

    function renderCurrentPosts() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const filteredPosts = posts.filter(function (post) {
            return post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query) ||
                post.itemType.toLowerCase().includes(query) ||
                getTagsText(post).toLowerCase().includes(query);
        });

        displayPosts(filteredPosts);
    }

    renderCurrentPosts();

    if (searchInput) {
        searchInput.addEventListener("input", renderCurrentPosts);
    }

    window.deletePost = async function (postId) {
        const deleted = await deletePost(postId);

        if (deleted) {
            posts = posts.filter(function (post) {
                return post._id !== postId;
            });
            renderCurrentPosts();
        }
    };
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

async function fetchPosts() {
    try {
        const response = await fetch("/posts");
        const result = await response.json();

        if (!response.ok || !result.success) {
            showMessage(result.message || "Error loading posts", true);
            return [];
        }

        return result.posts;
    } catch (error) {
        showMessage("Error loading posts", true);
        return [];
    }
}

function displayPosts(posts) {
    const postsList = document.getElementById("posts-list");

    if (!postsList) {
        return;
    }

    postsList.innerHTML = "";

    if (posts.length === 0) {
        postsList.appendChild(createEmptyMessage());
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        postsList.appendChild(createPostCard(posts[i]));
    }
}

function createPostCard(post) {
    const card = document.createElement("article");
    card.className = "Data_card post-card";
    card.id = "post-" + post._id;

    const title = document.createElement("h2");
    title.className = "feed-card-title";
    title.textContent = post.title;

    const type = document.createElement("p");
    type.className = "post-type";
    type.textContent = formatItemType(post.itemType) + " | Last stopped: " + formatLastStopped(post);

    const tags = document.createElement("div");
    tags.className = "post-tags";
    appendTags(tags, post.tags);

    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.content;

    const meta = document.createElement("p");
    meta.className = "post-meta";
    meta.textContent = "By " + post.author + " | Created: " + formatDate(post.createdAt) + " | Updated: " + formatDate(post.updatedAt);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-post-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        window.deletePost(post._id);
    });

    card.appendChild(title);
    card.appendChild(type);
    card.appendChild(tags);
    card.appendChild(content);
    card.appendChild(meta);
    card.appendChild(deleteButton);

    return card;
}

function appendTags(container, tags) {
    const safeTags = Array.isArray(tags) ? tags : [];

    if (safeTags.length === 0) {
        const emptyTag = document.createElement("span");
        emptyTag.className = "post-tag muted-tag";
        emptyTag.textContent = "no tags";
        container.appendChild(emptyTag);
        return;
    }

    for (let i = 0; i < safeTags.length; i++) {
        const tag = document.createElement("span");
        tag.className = "post-tag";
        tag.textContent = safeTags[i];
        container.appendChild(tag);
    }
}

function getTagsText(post) {
    return Array.isArray(post.tags) ? post.tags.join(" ") : "";
}

function formatItemType(itemType) {
    return itemType === "series" ? "Series" : "Movie";
}

function formatLastStopped(post) {
    const progress = post.lastStopped || {};
    const season = Number.isFinite(Number(progress.season)) ? Number(progress.season) : 0;
    const episode = Number.isFinite(Number(progress.episode)) ? Number(progress.episode) : 0;
    const time = typeof progress.time === "string" ? progress.time.trim() : "";

    if (post.itemType === "series") {
        return "s" + season + "e" + episode + (time ? " " + time : "");
    }

    return "s0:e0";
}
function createEmptyMessage() {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-feed";
    emptyMessage.textContent = "No posts found.";
    return emptyMessage;
}

async function deletePost(postId) {
    try {
        const response = await fetch("/posts/" + encodeURIComponent(postId), {
            method: "DELETE"
        });
        const result = await response.json();

        if (result.success) {
            const card = document.getElementById("post-" + postId);
            if (card) {
                card.remove();
            }
            showMessage(result.message || "Post deleted successfully", false);
            return true;
        }

        showMessage(result.message || "Error deleting post", true);
        return false;
    } catch (error) {
        showMessage("Error deleting post", true);
        return false;
    }
}

function showMessage(message, isError) {
    const messageElement = document.getElementById("feed-message");

    if (!messageElement) {
        alert(message);
        return;
    }

    messageElement.textContent = message;
    messageElement.className = isError ? "error-message" : "success-message";
}

function formatDate(value) {
    if (!value) {
        return "N/A";
    }

    return new Date(value).toLocaleString();
}