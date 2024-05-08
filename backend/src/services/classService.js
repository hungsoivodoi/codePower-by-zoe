import db from "../models/index"
const bcrypt = require('bcrypt');

let createNewClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Classes.create({
                title: data.title,
                maxStudent: data.maxStudent,
                currentStudent: '0',
                date: data.date,
                teacherId: data.teacherId,
                type: data.type,
                speciality: data.speciality,
                status: data.status,
                image: data.image,
                description: data.description,
            })

            resolve({
                errCode: 0,
                message: 'OK',
            })

        } catch (e) {
            reject(e);
        }
    })
}

let approveClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Classes.findOne({
                where: { id: data.id },
                raw: false
            })
            if (classes) {
                classes.status = 'approved',

                    await classes.save();
                await db.Notification.create({
                    userId: classes.teacherId,
                    status: 'normal',
                    content: `Yêu cầu tạo lớp học "${classes.title}" của bạn đã được duyệt`,
                    type: "unsee",
                })
                resolve({
                    errCode: 0,
                    message: 'class approved'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'classes not found'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let finishClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Classes.findOne({
                where: { id: data.id },
                raw: false
            })
            if (classes) {
                classes.status = 'finished',

                    await classes.save();
                resolve({
                    errCode: 0,
                    message: 'class finished'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'classes not found'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClass = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Classes.findOne({
                where: { id: id }
            })
            if (!classes) {
                resolve({
                    errCode: 2,
                    message: 'class is not exist'
                })
            } else {
                classes.status = 'deleted',

                    await classes.save();

                await db.Notification.create({
                    userId: classes.teacherId,
                    status: 'urgent',
                    content: `Lớp học "${classes.title}" của bạn đã bị xóa`,
                    type: "unsee",
                })
                resolve({
                    errCode: 0,
                    message: 'class deleted'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllClassByTeacherId = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = '';
            if (teacherId === 'ALL') {
                classes = await db.Classes.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.ClassRating,
                    },
                    ],
                    nest: true,
                    raw: false
                })
            } else if (teacherId && teacherId == 'approved') {
                classes = await db.Classes.findAll({
                    where: { status: 'approved' },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.ClassRating,
                    },
                    ],
                    nest: true,
                    raw: false
                })
            } else if (teacherId && teacherId == 'pending') {
                classes = await db.Classes.findAll({
                    where: { status: 'pending' },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.ClassRating,
                    },
                    ],
                    nest: true,
                    raw: false
                })
            } else {
                classes = await db.Classes.findAll({
                    where: {
                        teacherId: teacherId,
                        status: 'approved'
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.ClassRating,
                    },
                    ],
                    nest: true,
                    raw: false
                })
            }
            resolve(classes)
        } catch (e) {
            reject(e);
        }
    })
}

let editClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Classes.findOne({
                where: { id: data.id },
                raw: false
            })
            if (classes) {
                classes.title = data.title,
                    classes.maxStudent = data.maxStudent,
                    classes.date = data.date,
                    classes.teacherId = data.teacherId,
                    classes.type = data.type,
                    classes.speciality = data.speciality,
                    classes.status = data.status,
                    classes.image = data.image,
                    classes.description = data.description,

                    await classes.save();
                resolve({
                    errCode: 0,
                    message: 'Class Edited!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Class Not Found',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllClassByTeacherId: getAllClassByTeacherId,
    createNewClass: createNewClass,
    finishClass: finishClass,
    approveClass: approveClass,
    deleteClass: deleteClass,
    editClass: editClass,
}