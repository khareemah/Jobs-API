const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication Invalid');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to jobs controller
    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = authMiddleware;
