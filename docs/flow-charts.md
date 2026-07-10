# Assignment 4 Flow Charts

This document describes the main request flows in the SpongeNchill Assignment 4 project.

## MVC Page Flow

```mermaid
flowchart TD
    A[Browser requests page] --> B[Express server.js]
    B --> C[pageRoutes.js]
    C --> D[pageController.js]
    D --> E[views HTML file]
    E --> F[Browser loads static assets]
    F --> G[public/css, public/js, public/images]
```

## Login Flow

```mermaid
flowchart TD
    A[User enters username and password] --> B[public/js/auth.js]
    B --> C[POST /login with fetch]
    C --> D[authRoutes.js]
    D --> E[authController.login]
    E --> F{Credentials valid?}
    F -- Yes --> G[Save user in session]
    G --> H[Return success and redirectUrl]
    H --> I[Browser redirects to /profiles]
    F -- No --> J[Return error JSON]
    J --> K[Show login message]
```

## Load Posts Flow

```mermaid
flowchart TD
    A[User opens /main] --> B[views/feed.html]
    B --> C[public/js/Feed.js]
    C --> D[GET /posts with fetch]
    D --> E[postRoutes.js]
    E --> F[postController.getPosts]
    F --> G[Post model]
    G --> H[MongoDB]
    H --> I[Return posts JSON]
    I --> J[Feed.js renders post cards]
```

## Create Post Flow

```mermaid
flowchart TD
    A[User fills create post form] --> B[Feed.js reads form values]
    B --> C[POST /posts with JSON body]
    C --> D[postRoutes.js]
    D --> E[postController.createPost]
    E --> F{Required fields valid?}
    F -- No --> G[Return validation error]
    G --> H[Show error message]
    F -- Yes --> I[Post.create]
    I --> J[MongoDB saves post]
    J --> K[Return created post JSON]
    K --> L[Feed.js adds post to page]
```

## Delete Post Flow

```mermaid
flowchart TD
    A[User clicks Delete] --> B[Feed.js deletePost]
    B --> C[DELETE /posts/:id with fetch]
    C --> D[postRoutes.js]
    D --> E[postController.deletePost]
    E --> F{Valid MongoDB id?}
    F -- No --> G[Return Post not found]
    F -- Yes --> H[Post.findByIdAndDelete]
    H --> I{Post existed?}
    I -- No --> G
    I -- Yes --> J[MongoDB deletes post]
    J --> K[Return success JSON]
    K --> L[Feed.js removes card from screen]
```

## Static Assets Flow

```mermaid
flowchart TD
    A[HTML in views] --> B[Links to /css, /js, /images]
    B --> C[server.js serves public folder]
    C --> D[public/css]
    C --> E[public/js]
    C --> F[public/images]
```
