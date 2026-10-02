import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is issing from the .env file.");
    
}

export function createToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '2h',
    });

}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}