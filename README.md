## Router Dir

- This is a simple example of how to use the express router to create a modular route structure and dynamically load
  routes from a directory.
- The routes are loaded from the `router` directory and are dynamically loaded into the express app.

## Project Structure

```text
.
├── src
│   ├── bin
│   │   └── server.ts
│   ├── router
│   |   ├── lib
│   |   |   └── recursive-dir.ts
│   │   ├── index.ts
│   │   ├── route1
│   │   │   └── route1.ts
│   │   └── route2.ts
│   ├── app.js
├── package.json
└── README.md
```

- `router.ts`: Default file, use in the `src/router/[route-name]/[route-name].ts` file.

- `src/bin/server.ts`: The entry point of the application.
- `src/router/index.ts`: The main router file that loads all the routes from the `router` directory.
- `src/router/route1/route1.ts`: A sample route file.
- `src/router/route2.ts`: Another sample route file.
- `src/router/lib/recursive-dir.ts`: A utility function to recursively load all the files from a directory.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Libraries or Frameworks

[Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js

