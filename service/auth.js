const jwt = require('jsonwebtoken');
const secret = 'Tirth@2102';

function setUser(user) {
    return jwt.sign({
        _id:user._id,
        email:user.email,
    }, secret); // Return the generated token
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret); // Verify the token
    } catch (err) {
        console.error('Error verifying token:', err.message); // Log the error
        return null; // Return null if token verification fails
    }
}

module.exports = { setUser, getUser };
