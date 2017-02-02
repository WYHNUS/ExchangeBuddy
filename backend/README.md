### Installation
1. `npm install`
2. `npm start` or `node bin/www` or `nodemon bin/www`
3. Create a `.env` file based on `.env.example` in order to populate the environment variables.
4. The server by default is running on port 3001.

### Development
Handle routes in `routes/api.js`.

### Database
This project uses MySQL database.

To bootstrap database with default country and university data, enter `bootstrap` directory, create a `.env` file based on `.env.example`, and execute the following commands sequentially:
```
node country_bootstrap.js
node uni_bootstrap.js
node wiki_bootstrap.js
node post_bootstrap.js
node flag_bootstrap.js
```

### Migrations
Create a `config.json` file in `config` directory based on `config.json.example` and change the variables accordingly

install the sequelize cli globally
```
npm install sequelize-cli -g
```

run migrations command
```
sequelize db:migrate --config config/config.json
```

If it is executed without changing the actually database, rename the migration file in `migrations` directory to any other name and run the command again
