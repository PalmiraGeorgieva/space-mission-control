import { Router } from "express";
import { getCreate, postCreate, getDashboard, getDetails, getEdit, postEdit, deleteMission, supportMission} from '../controllers/missionController.js';
import {  isAuth } from "../middlewares/authMiddlewares.js";

const missionRouter = Router();

missionRouter.get('/create', isAuth, getCreate);
missionRouter.post('/create', isAuth, postCreate);
missionRouter.get('/dashboard', getDashboard);
missionRouter.get('/:missionId/details', getDetails);
missionRouter.get('/:missionId/edit', isAuth, getEdit);
missionRouter.post('/:missionId/edit', isAuth, postEdit);
missionRouter.get('/:missionId/delete', isAuth, deleteMission);
missionRouter.get('/:missionId/support', isAuth, supportMission);

export default missionRouter;