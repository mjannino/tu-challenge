// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    }  
  },
  
  test: {
    client: "sqlite3",
    connection: ":memory:",
  },

  useNullAsDefault: true,
};
