import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT verify error:', err.message);
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};
