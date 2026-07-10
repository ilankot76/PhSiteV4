# Solo Git Strategy - Assignment 4

The project was completed by one student in a private Git repository. Since there is no second partner, the Pull Request approval step is replaced by a self-review step before merging or submitting.

## Branch Strategy

Recommended branch history:

- `main` - stable project version for submission.
- `feature/mvc-structure` - MVC folders and routing organization.
- `feature/mongodb` - MongoDB connection and Mongoose post model.
- `feature/delete-post` - delete route and controller logic.
- `feature/client-fetch` - browser-side delete using `fetch`.
- `feature/public-assets` - CSS, JS, and images moved into `public`.
- `feature/docs` - README, flow charts, and submission notes.

## Solo Pull Request Process

If the course requires Pull Requests, open a PR from each feature branch into `main` and use the PR description as a self-review checklist.

For each PR or feature commit:

1. Explain what changed.
2. List the files that were changed.
3. Run the app locally.
4. Test the required behavior.
5. Confirm no secrets or `node_modules` were committed.
6. Merge only after checking the app still works.

## Commit Strategy

Use clear commits by topic, for example:

```txt
Add MVC post controller and routes
Add MongoDB post model
Add async post delete with fetch
Move static assets into public folder
Add assignment flow charts and README updates
```

## Security Rules

- `.env` is not committed.
- `node_modules/` is not committed.
- MongoDB Atlas credentials are not committed.
- Passwords, tokens, API keys, and personal secrets are not committed.
- The repository should remain private unless the course asks otherwise.

## Testing Before Submission

- Start MongoDB or connect to Atlas.
- Run `npm start`.
- Confirm the server prints `MongoDB connected successfully`.
- Log in with the test user.
- Open the feed page.
- Create a post.
- Confirm the post appears from MongoDB.
- Delete a post.
- Confirm the post disappears without refreshing.
- Refresh the page and confirm the deleted post does not return.
- Try deleting a missing post and confirm the server returns `Post not found`.