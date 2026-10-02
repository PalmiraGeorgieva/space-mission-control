import * as missionService from '../services/missionService.js';

export async function getLatestMissions(req, res, next) {
    try {
        const missions =
            await missionService.getLatestMissionsForApi();

        const result = missions.map(mission => ({
            name: mission.name,
            type: mission.type,
            destination: mission.destination,
            imageUrl: mission.imageUrl,
            crew: mission.crew,
            launchDate: mission.launchDate,
            duration: mission.duration,
            description: mission.description,
            ownerEmail: mission.owner.email,
            createdAt: mission.createdAt,
        }));

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}