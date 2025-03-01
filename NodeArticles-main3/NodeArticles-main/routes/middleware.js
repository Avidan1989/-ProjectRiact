const checkRole = (requiredRole) => {
    return (req, res, next) => {
        console.log('checkRole - user role:', req.session.user ? req.session.user.role : 'none');
        if (req.session.user && req.session.user.role === requiredRole) {
            next();
        } else {
            console.log('Access denied - user does not have required role:', requiredRole);
            res.status(403).json({ message: 'Access denied' });
        }
    };
};

const isAuthenticated = (req, res, next) => {
    console.log('isAuthenticated - req.headers.cookie:', req.headers.cookie);
    console.log('isAuthenticated - req.session:', req.session);
    console.log('Session ID:', req.sessionID);
    if (req.session.user) {
        next();
    } else {
        console.log('Unauthorized - no user in session');
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    checkRole,
    isAuthenticated,
};
