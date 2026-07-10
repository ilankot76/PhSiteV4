# PhSiteV2 - Assignment 4

SpongeNchill web project upgraded for Assignment 4. The project uses MVC structure, MongoDB, Mongoose, and asynchronous post deletion with `fetch`.

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

3. Start MongoDB locally or make sure the Atlas connection is available.

4. Start the server:

```sh
npm start
```

5. Open:

```txt
http://localhost:3000
```

Login test user:

```txt
username: admin
password: 123456
```

## Current Project Structure

```txt
config/              MongoDB connection
controllers/         Server-side request logic
models/              Mongoose models
routes/              Express route definitions
views/               HTML pages
public/css/          CSS files
public/js/           Browser JavaScript files
public/images/       Static image assets
docs/                Submission notes and flow charts
server.js            Express app startup
```

## MVC Structure

- `server.js` starts Express, loads middleware, serves `public`, mounts routes, connects to MongoDB, and starts the server.
- `config/db.js` connects to MongoDB through `process.env.MONGO_URI`.
- `models/postModel.js` defines the Mongoose `Post` model.
- `controllers/postController.js` contains the post logic for loading, creating, and deleting posts.
- `routes/postRoutes.js` maps post URLs to the post controller.
- `views/feed.html` displays the feed, post form, and post cards.
- `public/js/Feed.js` calls the post API with `fetch`.
- `public/css/feed.css` contains feed/post page styling.
- `controllers/authController.js` and `routes/authRoutes.js` handle login/signup.
- `controllers/profileController.js` and `routes/profileRoutes.js` handle profile data.

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

Each post card has a Delete button. When clicked, `public/js/Feed.js` sends a `DELETE` request:

```js
fetch(`/posts/${postId}`, { method: "DELETE" })
```

If the server returns success, the post is removed from the page without refreshing. Because it is also deleted from MongoDB, it does not return after refreshing the page.

## Git And Submission Notes

This project was completed as a solo submission. Work should still be organized with Git commits and, if the course system requires it, branches or Pull Requests can be shown as self-review evidence.

Do not commit:

```txt
.env
node_modules/
passwords
tokens
API keys
```

Useful submission docs are in `docs/`:

- `flow-charts.md`
- `solo-git-strategy.md`
- `submission-checklist.md`