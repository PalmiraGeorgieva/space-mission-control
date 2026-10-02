import * as missionService from '../services/missionService.js';


export async function getHome(req, res, next) {
    try {
        const missions = await missionService.getLatestMissions();

        return res.render('home/home', {
            missions,
            hasMissions: missions.length > 0,
        });
    } catch (error) {
        next(error);
    }
}