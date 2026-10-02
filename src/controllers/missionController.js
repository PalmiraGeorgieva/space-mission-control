import * as  missionService from '../services/missionService.js';

export function getCreate(req, res){
    res.render('mission/create');
};

export async function postCreate(req, res) {
    const missionData = req.body;

    try {
        await missionService.createMission(missionData, req.user.id);
        return res.redirect('/mission/dashboard');
    } catch (error) {
        return res.status(400).render('mission/create', {
            error: error.message,
            mission: missionData,
        })

    }
}

export async function getDashboard(req, res, next){
  try {
    const missions = await missionService.getAllMissions();
    return res.render('mission/dashboard', {
        missions,
        hasMissions: missions.length > 0,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDetails(req, res, next){
    try {
        const missionId = Number(req.params.missionId);

        if (!Number.isInteger(missionId) || missionId < 1) {
            return res.status(404).render('mission/404');
        }

        const mission = await missionService.getMissionById(missionId);

        if (!mission) {
            return res.status(404).render('mission/404');
        }

        const isOwner = req.user?.id === mission.ownerId;
        const isSupported = req.user ? mission.supportList.some(user => user.id === req.user.id) : false;

        return res.render('mission/details', {
            ...mission,
            user: req.user,
            isOwner,
            isSupported,
            supportCount: mission.supportList.length,
        });
    } catch (error) {
        next(error);
    }
}

export async function getEdit(req, res, next){
    const missionId = Number(req.params.missionId);

   try {
    const mission = await missionService.getMissionById(missionId);

    if(!mission) {
        return res.status(404).render('mission/404');
    }
    
    if(mission.ownerId !== req.user.id) {
        return res.redirect(`/mission/${missionId}/details`);
    }
    return res.render('mission/edit', {
        ...mission,
    });
   } catch (error) {
    next(error);
   }
}


export async function postEdit(req, res, next) {
    const missionId = Number(req.params.missionId);

    try {
        const mission = await missionService.getMissionById(missionId);

        if (!mission) {
            return res.status(404).render('mission/404');
        }

        if (mission.ownerId !== req.user.id) {
            return res.redirect(`/mission/${missionId}/details`);
        }

        await missionService.editMission(missionId, req.body);

        return res.redirect(`/mission/${missionId}/details`);
    } catch (error) {
        return res.status(400).render('mission/edit', {
            error: error.message,
            ...req.body,
            id: missionId,
        });
    }
}


export async function deleteMission(req, res, next){
    const missionId = Number(req.params.missionId);

    try {
        const mission = await missionService.getMissionById(missionId);

        if(!mission) {
            return res.status(404).render('mission/404');
        }

        if(mission.ownerId !== req.user.id) {
            return res.redirect(`/mission/${missionId}/details`);
        }

        await missionService.deleteMission(missionId);
        return res.redirect('/mission/dashboard');
    } catch (error) {
        next(error);
    }
}

export async function supportMission(req, res, next){
   const missionId = Number(req.params.missionId);
    
   try {
    const mission = await missionService.getMissionById(missionId);
    
    if (!mission) {
        return res.status(404).render('mission/404');
    }

    if(mission.ownerId === req.user.id) {
        return res.redirect(`/mission/${missionId}/details`);
    } 

    const alreadySupported = mission.supportList.some(
        supporter => supporter.is === req.user.id
    );

    if (alreadySupported) {
        return res.redirect(`/mission/${missionId}/details`);
    }
    await missionService.supportMission(missionId, req.user.id);
    return res.redirect(`/mission/${missionId}/details`);

   } catch(error) {
    next(error);
   }
}
