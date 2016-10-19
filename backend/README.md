### Installation
1. `npm install`
2. `node bin/www` or `nodemon bin/www`
3. Create a `.env` file based on `.env.example` in order to populate the environment variables.
4. The server by default is running on port 3000.

### Development
Handle routes in `routes/api.js`.

### Database
This project uses MySQL database.

To bootstrap database with default country and university data, connect to your DB and execute SQL file through command line in SQL folder, and replace *database_name* with your own database name:
```
mysql -u username -p database_name < bootstrap_data.sql
```