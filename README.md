# [ExchangeBuddy](https://app.exchangebuddy.com/)

- Current stable version: **1.0**
- Current development version: **2.0** 

## The Team

### Business Development/Marketing

- Eugene Ng - *Founder*
- Tan Kiat Han
- Lee Xin Ru

### Developers

- [Irvin Lim](https://github.com/irvinlim) - *Frontend lead, DevOps*
- [Ng Kai Sing](https://github.com/whatthestone) - *Frontend development, design*
- [Zhang Hanming](https://github.com/ZhangHanming) - *Backend lead, data migration*
- [Wang Yanhao](https://github.com/WYHNUS) - *Backend development*
- [Quek Kai Yu](https://github.com/kaiyu92) - *Backend development*
- [Cai Deshun](https://github.com/unusep) - *Backend development*

### Background

ExchangeBuddy came a long way until where it is today. 

#### CS3216 Assignment 1

The very first iteration, found [here](https://github.com/irvinlim/exchangebuddy) was prototyped as part of [CS3216](http://www.cs3216.com/) Assignment 1. The team included:

- Eugene Ng
- [Irvin Lim Wei Quan](https://github.com/irvinlim)
- [Leon Mak An Sheng](https://github.com/leonmak)
- [Lam Chi Thanh](https://github.com/zevergreenz)

#### CS3216 Final Project

The second iteration, also known as Version 1.0, was prototyped as part of CS3216 Final Project. The team included:

- Eugene Ng
- [Wang Yanhao](https://github.com/WYHNUS) - *Full-stack developer*
- [Zhang Hanming](https://github.com/ZhangHanming) - *Backend developer*
- [Lee Kai Yi](https://github.com/kaiyisg) - *Frontend developer* 


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