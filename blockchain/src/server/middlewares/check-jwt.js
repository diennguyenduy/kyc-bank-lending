/* Ứng dụng nhiều nhất của JWT Token, và mục đích duy nhất nên sử dụng JWT
  là dùng nó như một cơ chế xác thực API. Điều này hiện nay là quá phổ biến
  và được sử dụng rộng rãi, kể cả Google cũng sử dụng JWT để xác thực các APIs của họ.
*/
const jwt = require('jsonwebtoken');
let secretJWT = require('../configs/secret').secret;

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'No token provided',
    });
  }

  jwt.verify(token, secretJWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Failed to authentication token',
      });
    }

    req.decoded = decoded;
    next();
  });
};
