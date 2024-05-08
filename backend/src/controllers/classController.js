import classService from '../services/classService';
import db from '../models/index';

let handleApproveClass = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await classService.approveClass(data);
    return res.status(200).json(message);
}

let handleFinishClass = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await classService.finishClass(data);
    return res.status(200).json(message);
}


let handleDeleteClass = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let message = await classService.deleteClass(req.body.id);
    return res.status(200).json(message);
}

let hanldeGetAllClassesByTeacherId = async (req, res) => {
    let id = req.query.teacherId; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing teacherId',
        })
    }
    let classes = await classService.getAllClassByTeacherId(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        classes
    })
}

let handleCreateClass = async (req, res) => {
    if (!req.body.teacherId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing body input parameters',
        })
    } else {
        let message = await classService.createNewClass(req.body);
        console.log(req.body)
        return res.status(200).json(message);
    }
}

let handleUpdateClass = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Class Id Parameter'
        })
    }
    let data = req.body;
    let message = await classService.editClass(data);
    return res.status(200).json(message);
}
module.exports = {
    hanldeGetAllClassesByTeacherId: hanldeGetAllClassesByTeacherId,
    handleCreateClass: handleCreateClass,
    handleApproveClass: handleApproveClass,
    handleFinishClass: handleFinishClass,
    handleDeleteClass: handleDeleteClass,
    handleUpdateClass: handleUpdateClass,
}