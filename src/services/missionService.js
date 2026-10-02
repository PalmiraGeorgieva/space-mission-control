import {prisma} from '../config/prisma.js';

export async function  getLatestMissions() {
    return prisma.mission.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,

    });

}

export async function createMission(data, ownerid) {
    return prisma.mission.create({
        data: {
            name: data.name,
            type: data.type,
            destination: data.destination,
            imageUrl: data.imageUrl,
            crew: Number(data.crew),
            launchDate: data.launchDate,
            duration: data.duration,
            description: data.description,
            ownerId: ownerid,
        },
    });
    
}

export async function getAllMissions() {
    return prisma.mission.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function supportMission(missionId, userId) {
    return prisma.mission.update({
        where: { id: missionId },
        data: {
            supportList: {
                connect: { id: userId },
            },
        },
    });
}

export async function getMissionById(missionId) {
    return prisma.mission.findUnique({
        where: {
            id: Number(missionId),
        },
        include: {
            owner: true,
            supportList: true,
        }
    });
}

export async function deleteMission(missionId) {
    return prisma.mission.delete({
        where: {
            id: Number(missionId),
        }
    });
}

export async function editMission(missionId, data) {
    return prisma.mission.update({
        where: {
            id: Number(missionId),
        },
        data: {
            name: data.name,
            type: data.type,
            destination: data.destination,
            imageUrl: data.imageUrl,
            crew: Number(data.crew),
            launchDate: data.launchDate,
            duration: data.duration,
            description: data.description,
        },
    });
}


export async function getLatestMissionsForApi() {
    return prisma.mission.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
        select: {
            name: true,
            type: true,
            destination: true,
            imageUrl: true,
            crew: true,
            launchDate: true,
            duration: true,
            description: true,
            createdAt: true,
            owner: {
                select: {
                    email: true,
                },
            },
        },
    });
}

