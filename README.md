# ExchangeBuddy

## The Team

### Business and Marketing Team

- Eugene Ng - *Founder*
- Kiat Han

### Development Team

- [Wang Yanhao](https://github.com/WYHNUS) - *Full-stack developer*
- [Lee Kai Yi](https://github.com/kaiyisg)- *Frontend developer*
- [Irvin Lim](https://github.com/irvinlim) - *Frontend developer*
- [Zhang Hanming](https://github.com/ZhangHanming) - *Backend developer*

Project is based on [work](https://github.com/irvinlim/exchangebuddy) from a previous project. The team included:

- Eugene Ng
- [Irvin Lim Wei Quan](https://github.com/irvinlim)
- [Leon Mak An Sheng](https://github.com/leonmak)
- [Lam Chi Thanh](https://github.com/zevergreenz)

## Setup

The application comes in two parts, the *frontend* and *backend* applications.

### Frontend

To get the frontend process running for development:

```
cd frontend
npm install
touch .env   # Configuration in this file, follow .env.example
npm run dev
```

For `API_ROOT_URL`, put the full root URL to access the API, **without trailing slash**, e.g. `https://app.exchangebuddy.com/api`.

You can then access the frontend on [http://localhost:3000](http://localhost:3000).

See more information at the [frontend README](https://github.com/WYHNUS/ExchangeBuddy/blob/master/frontend/README.md). In particular, the production build will be served as a static HTML file, compiled with Webpack.

### Backend

To get the backend process running:

```
cd backend
npm install
touch .env   # Configuration in this file, follow .env.example
node bin/www
```

The backend will be running on the port as defined in `.env`.