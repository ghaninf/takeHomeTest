const JWT = require('jsonwebtoken');

class Token {
  static generateJWTToken(user) {
    return JWT.sign(
      {
        email: user.email,
        password: user.password
      },
      process.env.NEXT_PUBLIC_KEY,
      {
        expiresIn: '1D'
      }
    )
  }

  static verifyJWTToken(token) {
    return JWT.verify(token, process.env.NEXT_PUBLIC_KEY)
  }

  static decodeJWTToken(token) {
    return JWT.decode(token)
  }
}

module.exports = Token