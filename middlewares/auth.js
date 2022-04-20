const jwt = require('jsonwebtoken');

exports.userAuth = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization.split(' ')[1];
      // Verify
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } else {
      res.status(400).json({ message: `Unauthorized` });
    }
  } catch (error) {
    console.log(error.message);
  }
};
