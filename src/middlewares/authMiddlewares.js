import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if(!token) {
        req.user = null;
        res.locals.user = null;
        res.locals.isAuthenticated = false;

        return next();

    }

    try {
        const user = verifyToken(token);

        req.user = user;
        res.locals.user = user;
        res.locals.isAuthenticated = true;

    }catch (error) {
        res.clearCookie('auth');

        req.user = null;
        res.locals.user = null;
        res.locals.isAuthenticated = false;

    }

    next();
}

export function isAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export function isGuest(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}