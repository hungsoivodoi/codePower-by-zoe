import classStudentService from '../services/classStudentService';
import db from '../models/index';



let handleApproveStudent = async (req, res) => {
    if (!req.body.studentId || !req.body.teacherId || !req.body.classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await classStudentService.approveStudent(data);
    return res.status(200).json(message);
}

let handleDenyStudent = async (req, res) => {
    if (!req.body.studentId || !req.body.teacherId || !req.body.classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await classStudentService.denyStudent(data);
    return res.status(200).json(message);
}

let handleEnrollStudent = async (req, res) => {
    if (!req.body.teacherId || !req.body.studentId || !req.body.classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing body input parameters',
        })
    } else {
        let message = await classStudentService.enrollNewStudent(req.body);
        return res.status(200).json(message);
    }
}

let hanldeGetAllClassStudent = async (req, res) => {
    if (!req.query.type || !req.query.classId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing classId',
        })
    }
    let students = await classStudentService.getAllStudentByClassId(req.query.type, req.query.classId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        students
    })
}

let hanldeGetAllStudentClass = async (req, res) => {
    if (!req.query.studentId) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing studentId',
        })
    }
    let classes = await classStudentService.getAllClassByStudentId(req.query.studentId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        classes
    })
}

module.exports = {
    handleEnrollStudent: handleEnrollStudent,
    hanldeGetAllClassStudent: hanldeGetAllClassStudent,
    handleApproveStudent: handleApproveStudent,
    handleDenyStudent: handleDenyStudent,
    hanldeGetAllStudentClass: hanldeGetAllStudentClass,
}