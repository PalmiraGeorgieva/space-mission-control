import express from 'express';
import { engine } from 'express-handlebars';
import homeRouter from './routes/homeRouter.js';
import authRouter from './routes/authRouter.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddlewares.js';
import missionRouter from './routes/missionRouter.js';
import apiRouter from './routes/apiRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';


const app = express();
app.engine('hbs', engine({
    extname: '.hbs',
}));



app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('src/public'));
app.use(authMiddleware);

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/mission', missionRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
    return res.status(404).render('mission/404');
});

app.use(errorMiddleware);

app.listen(3000, () => console.log('Server is running'));