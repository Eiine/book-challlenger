module.exports = {
  development: {
    username: 'root',
    password: "abc123",
    database: 'library',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: "abc123",
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: "abc123",
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
