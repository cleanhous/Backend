// src/services/userService.js
const connection = require('./connection');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { getAllUsers };
