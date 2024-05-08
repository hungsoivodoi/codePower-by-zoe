import classUtils from '../services/classUtils';
import db from '../models/index';


let handleGetAllNotiByClassId = async (req, res) => {
    let classId = req.query.classId; // ALL, id
    if (!classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing class Id',
        })
    }
    let notifications = await classUtils.getAllNotiByClassId(classId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        notifications
    })
}

let handleCreateNewNoti = async (req, res) => {
    let message = await classUtils.createNewClassNotification(req.body);
    return res.status(200).json(message);
}

let handleEditNotification = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing noti id Parameter'
        })
    }
    let data = req.body;
    let message = await classUtils.editClassNotification(data);
    return res.status(200).json(message);
}

let handleDeleteNofitication = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing notification Id'
        })
    }
    let message = await classUtils.deleteNotification(req.body.id);
    return res.status(200).json(message);
}

let handleGetClassContent = async (req, res) => {
    let classId = req.query.classId; // ALL, id
    if (!classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing class Id',
        })
    }
    let classContents = await classUtils.getClassContent(classId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        classContents
    })
}

let handleEditClassContent = async (req, res) => {
    if (!req.body.classId) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing classContent id Parameter'
        })
    }
    let data = req.body;
    let message = await classUtils.editClassContent(data);
    return res.status(200).json(message);
}

let handleGetAllNotiByUserId = async (req, res) => {
    let userId = req.query.userId; // ALL, id
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing userId',
        })
    }
    let notifications = await classUtils.getAllNotiByUserId(userId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        notifications
    })
}

let handleGetAllUnseeNotiByUserId = async (req, res) => {
    let userId = req.query.userId; // ALL, id
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing userId',
        })
    }
    let notifications = await classUtils.getAllUnseeNotiByUserId(userId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        notifications
    })
}

let handleSeeNoti = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await classUtils.seeNoti(data);
    return res.status(200).json(message);
}

let handleDeleteUserNofitication = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing notification Id'
        })
    }
    let message = await classUtils.deleteUserNotification(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleCreateNewNoti: handleCreateNewNoti,
    handleGetAllNotiByClassId: handleGetAllNotiByClassId,
    handleDeleteNofitication: handleDeleteNofitication,
    handleEditNotification: handleEditNotification,
    handleGetClassContent: handleGetClassContent,
    handleEditClassContent: handleEditClassContent,
    handleGetAllNotiByUserId: handleGetAllNotiByUserId,
    handleGetAllUnseeNotiByUserId: handleGetAllUnseeNotiByUserId,
    handleSeeNoti: handleSeeNoti,
    handleDeleteUserNofitication: handleDeleteUserNofitication,
}