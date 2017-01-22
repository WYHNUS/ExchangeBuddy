### Installation
1. `npm install`
2. `npm start` or `node bin/www` or `nodemon bin/www`
3. Create a `.env` file based on `.env.example` in order to populate the environment variables.
4. The server by default is running on port 3001.

### Development
Handle routes in `routes/api.js`.

### Database
This project uses MySQL database.

To bootstrap database with default country and university data, connect to your DB and execute SQL file through command line in SQL folder, and replace *database_name* with your own database name:
```
mysql -u username -p database_name < bootstrap_data.sql
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
