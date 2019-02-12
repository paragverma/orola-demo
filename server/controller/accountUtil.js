const crypto = require('crypto');
module.exports = {
  checkPassword: function (password, salt, callback) {
    // we use pbkdf2 to hash and iterate 10k times by default
    var iterations = 10000,
    keyLen = 64; // 64 bit.
    crypto.pbkdf2(password, salt, iterations, keyLen, 'sha512', callback);
  },

  EMAIL_NOT_FOUND : 'Email ID not found',
  INVALID_PWD : 'Invalid Password',
  DB_ERROR : 'Internal Database error',
  NOT_FOUND : 'Data not found',
  EMAIL_ALREADY_EXISTS : 'Email already registered',
  COULD_NOT_CREATE_USER : 'Error creating user',
  PASSWORD_RESET_EXPIRED : 'Password reset expire',
  PASSWORD_RESET_HASH_MISMATCH : 'Password reset hash mismatch',
  PASSWORD_RESET_EMAIL_MISMATCH : 'Password reset email mismatch',
  COULD_NOT_RESET_PASSWORD : 'Password reset failed',
};
