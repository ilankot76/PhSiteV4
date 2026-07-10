# Submission Checklist - Assignment 4

## Code Requirements

- [ ] Project uses MVC folders: `models`, `controllers`, `routes`, `views`, `config`.
- [ ] `server.js` starts Express and connects to MongoDB.
- [ ] `config/db.js` connects using `process.env.MONGO_URI`.
- [ ] `models/postModel.js` defines a Mongoose `Post` model.
- [ ] Posts include `title`, `content`, `author`, `createdAt`, and `updatedAt`.
- [ ] `GET /posts` loads posts from MongoDB.
- [ ] `POST /posts` creates posts in MongoDB.
- [ ] `DELETE /posts/:id` deletes posts from MongoDB.
- [ ] Delete returns success JSON when the post is deleted.
- [ ] Delete returns `Post not found` when the post does not exist.
- [ ] `public/js/Feed.js` deletes posts with `fetch`.
- [ ] Deleted posts are removed from the screen without refreshing.
- [ ] Static files are organized under `public/css`, `public/js`, and `public/images`.

## Manual Test Evidence

Take screenshots or save output for:

- [ ] Server running with `MongoDB connected successfully`.
- [ ] Feed page showing posts from MongoDB.
- [ ] Creating a new post.
- [ ] Deleting a post.
- [ ] Refreshing after delete and showing the post is still gone.
- [ ] Error response for deleting a missing post.

## Git Evidence

For solo work, provide evidence of organized Git work:

- [ ] Private repository screenshot.
- [ ] Branches or commit history screenshot.
- [ ] Pull Request screenshot if required by the course system.
- [ ] PR/self-review description screenshot if working alone.

## Files To Submit

- [ ] All project code files.
- [ ] `README.md`.
- [ ] `docs/flow-charts.md`.
- [ ] `docs/solo-git-strategy.md`.
- [ ] Screenshots or output proving MongoDB connection and required tests.

## Do Not Submit

- [ ] `.env`.
- [ ] `node_modules/`.
- [ ] Passwords, tokens, API keys, or private connection strings.