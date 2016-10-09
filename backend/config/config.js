module.exports = {
    'port': process.env.PORT,
    'secret': process.env.APP_SECRET,
    'db': {
      'username': process.env.DB_USER_NAME,
      'password': process.env.DB_USER_PASSWORD,
      'database': process.env.DB_DATABASE,
      'host': process.env.DB_URL,
      'dialect': 'mysql'
    },
    'facebookClientId': process.env.FB_CLIENT_ID,
    'facebookClientSecret' : process.env.FB_CLIENT_SECRET
};
