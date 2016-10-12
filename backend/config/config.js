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
    'facebookClientSecret': process.env.FB_CLIENT_SECRET,
    'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
    'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY
};
