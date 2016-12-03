# ExchangeBuddy Frontend

This project was originally bootstrapped with [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit#react-redux-starter-kit).

## Installation
1. Install Node.js (version >4.5)
2. Install dependencies with 'npm install'
3. Create a `.env` file based on `.env.example` to configure the environment variables.

## Development
```
npm run dev
```

This makes use of [`webpack-dev-server`](https://webpack.github.io/docs/webpack-dev-server.html) for easier development, together with [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html). Development should be done in the `src` directory.

## Building
```
npm run build
```

Building is done using Webpack to compile the application into the `/dist` folder. Afterwhich, the entire application can be run directly from the `/dist/index.html` file. Use [Nginx](https://www.nginx.com/)'s `try_files` directive as follows to route requests to `index.html`:

```nginx
location / {
  root /path/to/dist/folder;
  try_file $uri /index.html;
}
```

Configuration for Apache not provided, but should be able to achieve the same effect.

## Stack
- React
- Material-UI
- Redux
- React Router
- Webpack
- Sass