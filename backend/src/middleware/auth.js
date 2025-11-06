const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log('✅ Token verified for user:', decoded.id || decoded.userId);
      next();
    } catch (err) {
      console.log('❌ Invalid token:', err.message);
      return res.status(401).json({
        status: 'error',
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error in authentication'
    });
  }
};

module.exports = { auth };
