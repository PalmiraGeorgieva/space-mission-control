
import * as authService from '../services/authService.js';
import { loginSchema, registerSchema } from '../schema/authSchema.js';


export function getLogin(req, res) {
    res.render('auth/login');
}

export function getRegister(req, res) {
    res.render('auth/register');
}

export async function postRegister(req, res) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues.map(issue => issue.message);

        return res.status(400).render('auth/register', {
            errors,
            email: req.body.email,
        });
    }

    const { email, password } = result.data;

    try {
        const token = await authService.register(email, password);
        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
        });

        return res.redirect('/');
    } catch (error) {
        return res.status(400).render('auth/register', {
            errors: [error.message],
            email,
        });
    }
}

export async function postLogin(req, res) {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map(issue => issue.message);

        return res.status(400).render('auth/login', {
            errors,
            email: req.body.email
        });
    }
    
    const {email, password } = result.data;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
        });
       return res.redirect('/');
    } catch (error){
        return res.status(400).render('auth/login', {
            errors: [error.message],
            email,
        });
    }
}

export function logout(req, res) {
    res.clearCookie('auth');
    return res.redirect('/');
}
