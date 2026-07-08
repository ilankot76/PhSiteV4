# PhSiteV2 - Assignment 4

Assignment 4 upgrades the SpongeNchill web project to MVC, MongoDB, Mongoose, and asynchronous post deletion with `fetch`.

## Run Instructions

1. Install dependencies:

```sh
npm install
```

2. Create `.env` in the project root:

```env
MONGO_URI=mongodb://localhost:27017/posts-app
SESSION_SECRET=replace-with-your-secret
PORT=3000
```

For MongoDB Atlas, put the Atlas connection string in `MONGO_URI`. Do not commit `.env`.

3. Start the server:

```sh
npm start
```

4. Open:

```txt
http://localhost:3000
```

Login test user:

```txt
username: admin
password: 123456
```

## MVC Structure

- `server.js` starts Express, loads middleware, serves static assets, mounts routes, connects to MongoDB, and starts the server.
- `config/db.js` connects to MongoDB through `process.env.MONGO_URI`.
- `models/postModel.js` defines the Mongoose `Post` model.
- `controllers/postController.js` contains the post logic for loading, creating, and deleting posts.
- `routes/postRoutes.js` maps post URLs to the post controller.
- `views/feed.html` is the feed view that displays posts and the create-post form.
- `Website-for-ph-v4/scripts/Feed.js` is the browser script that calls the post API with `fetch`.
- `controllers/profileController.js`, `controllers/authController.js`, `routes/profileRoutes.js`, and `routes/authRoutes.js` keep the existing profile/login code organized outside `server.js`.

## Post Model

The post model includes the required fields:

- `title`
- `content`
- `author`
- `createdAt`
- `updatedAt`

It also includes site fields for the feed UI:

- `itemType`
- `tags`
- `lastStopped`

## Post Routes

- `GET /posts` returns all posts from MongoDB.
- `POST /posts` creates a new post in MongoDB.
- `DELETE /posts/:id` deletes a post from MongoDB.

Successful delete response:

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

Missing post response:

```json
{
  "success": false,
  "message": "Post not found"
}
```

## Client Delete Flow

Each post card has a Delete button. When clicked, `Feed.js` sends a `DELETE` request:

```js
fetch(`/posts/${postId}`, { method: "DELETE" })
```

If the server returns success, the post is removed from the page without refreshing. Because it is also deleted from MongoDB, it does not return after refreshing the page.

## Git Rules

- Work in a private repository.
- Use branches and merge into `main` with Pull Requests.
- The second partner should approve the Pull Request.
- Do not commit `.env`, passwords, tokens, API keys, or `node_modules/`.

`.gitignore` already excludes:

```txt
node_modules/
.env
```
