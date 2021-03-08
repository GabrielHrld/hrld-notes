const config ={
  DB_USER : process.env.DB_USER || 'db_user_gabi',
  DB_NAME : process.env.DB_NAME || 'notes',
  DB_PASS : process.env.DB_PASS || 'crazylife013',
  DB_HOST : process.env.DB_HOST || 'cluster0.s5abe.mongodb.net'
}

module.exports = config;