import { where } from "sequelize"
import db from "../models/index"
import teacherRating from "../models/teacherRating"
let editRating = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classRating = await db.ClassRating.findOne({
                where: {
                    classId: data.classId,
                    studentId: data.studentId
                },
                raw: false
            })
            let teacherRating = await db.TeacherRating.findOne({
                where: {
                    teacherId: data.teacherId,
                    studentId: data.studentId
                },
                raw: false
            })
            if (classRating) {
                classRating.ratingValue = data.classRatingValue,
                    await classRating.save();
            }
            else {
                await db.ClassRating.create({
                    classId: data.classId,
                    teacherId: data.teacherId,
                    studentId: data.studentId,
                    ratingValue: data.classRatingValue,
                })
            }
            if (teacherRating) {
                teacherRating.ratingValue = data.teacherRatingValue,
                    await teacherRating.save();
            }
            else {
                await db.TeacherRating.create({
                    teacherId: data.teacherId,
                    studentId: data.studentId,
                    ratingValue: data.teacherRatingValue,
                })
            }
            resolve({
                errCode: 1,
                message: 'rating updated'
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getClassRating = (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ratings = '';
            ratings = await db.ClassRating.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    classId: classId
                },
                raw: true,
            })
            resolve(ratings)
        } catch (e) {
            reject(e);
        }
    })
}

let getTeacherRating = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ratings = '';
            try {
                ratings = await db.TeacherRating.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                    where: {
                        teacherId: teacherId
                    },
                    raw: true,
                })
                resolve(ratings)
            } catch (e) {
                console.log(e)
                reject(e);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    editRating: editRating,
    getClassRating: getClassRating,
    getTeacherRating: getTeacherRating,
}