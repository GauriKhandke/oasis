const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {

    // Fetch token from request header
    const token = req.header('x-auth-token');

    if (!token)
      return res
        .status(401)
        .json({ msg: 'No authenticated token..Access Denied!' });

    //verify the token with JWT_SECRET
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({
        msg: 'Token verification failed, Authorization denied!',
	  });
	
    // Once user id verified, send userId  request
    req.user = verified.id;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
