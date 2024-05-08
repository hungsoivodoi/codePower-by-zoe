import ratingServices from '../services/ratingServices';
import db from '../models/index';

let handleEditRating = async (req, res) => {
    console.log(req.body)
    if (!req.body.classId || !req.body.teacherId || !req.body.studentId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await ratingServices.editRating(data);
    return res.status(200).json(message);
}

let handleGetClassRating = async (req, res) => {
    let id = req.query.classId; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing classId',
        })
    }
    let ratings = await ratingServices.getClassRating(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        ratings
    })
}

let handleGetTeacherRating = async (req, res) => {
    let id = req.query.teacherId; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing teacherId',
        })
    }
    let ratings = await ratingServices.getTeacherRating(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        ratings
    })
}

module.exports = {
    handleEditRating: handleEditRating,
    handleGetClassRating: handleGetClassRating,
    handleGetTeacherRating: handleGetTeacherRating,

}