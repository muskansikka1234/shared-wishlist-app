import jwt from 'jsonwebtoken';

const payload = { id: 'user123' };

const token = jwt.sign(payload, 'secret#text', { expiresIn: '1h' });

console.log('Generated JWT:', token);
