import { Router } from "express";

import {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
} from '../controllers/authControllers.js';
import { isAuth, isGuest } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.get('/login',isGuest, getLogin);
authRouter.post('/login', postLogin);

authRouter.get('/register', isGuest, getRegister);
authRouter.post('/register', isGuest, postRegister);

authRouter.get('/logout',isAuth, logout);

export default authRouter;