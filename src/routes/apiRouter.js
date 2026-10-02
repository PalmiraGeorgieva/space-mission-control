import { Router } from 'express';
import { getLatestMissions } from '../controllers/apiController.js';

const apiRouter = Router();

apiRouter.get('/missions/latest', getLatestMissions);

export default apiRouter;