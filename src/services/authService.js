import bcrypt from 'bcrypt';

import { prisma } from '../config/prisma.js';
import { createToken } from '../utils/jwt.js';

const SALT_ROUND = 10;

export async function register(email, password) {
    const normalEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalEmail,
        },
    });

    if(existingUser) {
        throw new Error('A user with this email already exists.');
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUND);
    const user = await prisma.user.create({
        data: {
            email: normalEmail,
            password: hashPassword,
        },
    });

    return createToken({
        id: user.id,
        email: user.email,
    });
}

export async function login(email, password) {
    const normalEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: normalEmail,
        },
    });

    if(!user) {
        throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid email or password.");
        
    }
    return createToken({
        id: user.id,
        email: user.email,
    });
}
