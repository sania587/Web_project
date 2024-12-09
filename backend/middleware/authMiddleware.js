const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(`JWT Error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Role-based authorization middleware
const protectRole = (requiredRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 

    if (!requiredRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  } catch (error) {
    console.error(`JWT Error: ${error.message}`); 
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { protect, protectRole };
