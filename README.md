# PhSiteV2 - Assignment 4 Base

This folder was cleaned from the previous Git repository and is ready to become a new private repository for Assignment 4.

## Current status

- Old `.git` history was removed.
- `.gitignore` excludes `node_modules/` and `.env`.
- `package.json` no longer points to the old GitHub repository.
- The existing Express/static app is still in place and has not yet been converted to MVC or MongoDB.

## Start locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Create a new Git repository

```bash
git init
git add .
git commit -m "Initial assignment 4 base"
git branch -M main
git remote add origin <your-private-repository-url>
git push -u origin main
```

## Suggested assignment branches

```bash
git checkout -b feature/mvc-structure
git checkout -b feature/mongodb
git checkout -b feature/delete-post
git checkout -b feature/client-fetch
git checkout -b feature/readme
```

## Assignment 4 implementation TODO

- Refactor server code into MVC folders: `models/`, `controllers/`, `routes/`, `views/`, `config/`.
- Add MongoDB connection through `config/db.js`.
- Add `Post` model with `title`, `content`, `author`, `createdAt`, and `updatedAt`.
- Load posts from MongoDB instead of in-memory JSON data.
- Add post creation endpoint.
- Add `DELETE /posts/:id` endpoint.
- Delete posts from the page with `fetch` without refreshing.
- Update README with final run instructions and MVC explanation.
