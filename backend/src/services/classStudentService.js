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
                await db.Classes.destroy({
                    where: { id: id }
                });
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

let approveStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.ClassStudent.findOne({
                where: {
                    classId: data.classId,
                    teacherId: data.teacherId,
                    studentId: data.studentId
                },
                raw: false
            })

            if (students) {
                students.status = 'approved',

                    await students.save();
                let classes = await db.Classes.findOne({
                    where: {
                        id: data.classId,
                    },
                    raw: false
                })
                classes.currentStudent = parseInt(classes.currentStudent) + 1;
                await classes.save();
                await db.Notification.create({
                    userId: students.studentId,
                    status: 'normal',
                    content: `Yêu cầu đăng ký lớp học "${classes.title}" của bạn đã được duyệt. Chào mừng đến với lớp học`,
                    type: "unsee",
                })
                resolve({
                    errCode: 0,
                    message: 'Học sinh đã được duyệt vào lớp'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'học sinh không thuộc lớp này?'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let denyStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = await db.ClassStudent.findOne({
                where: {
                    classId: data.classId,
                    teacherId: data.teacherId,
                    studentId: data.studentId
                },
                raw: false
            })
            if (students) {
                if (students.status == 'approved') {
                    let classes = await db.Classes.findOne({
                        where: {
                            id: data.classId,
                        },
                        raw: false
                    })
                    classes.currentStudent = parseInt(classes.currentStudent) - 1;
                    await classes.save();
                    await db.Notification.create({
                        userId: students.studentId,
                        status: 'urgent',
                        content: `Bạn đã bị loại khỏi lớp học "${classes.title}". Lý do: ${data.reason}`,
                        type: "unsee",
                    })
                }
                students.status = 'removed',
                    students.reason = data.reason,

                    await students.save();

                resolve({
                    errCode: 0,
                    message: 'Học sinh đã bị cấm'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'học sinh không thuộc lớp này?'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllStudentByClassId = (type, classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let students = '';
            if (type && type === 'approved') {
                students = await db.ClassStudent.findAll({
                    where: {
                        classId: classId,
                        status: 'approved'
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    }],
                    nest: true,
                    raw: false
                })
            } else if (type && type == 'pending') {
                students = await db.ClassStudent.findAll({
                    where: {
                        classId: classId,
                        status: 'pending'
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    }],
                    nest: true,
                    raw: true
                })
            } else {
                students = await db.ClassStudent.findAll({
                    where: {
                        classId: classId,
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                    include: [{
                        model: db.User,
                        attributes: { exclude: ['password'] }
                    }],
                    nest: true,
                    raw: true
                })
            }
            resolve(students)
        } catch (e) {
            reject(e);
        }
    })
}

let enrollNewStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = await db.Classes.findOne({
                where: {
                    id: data.classId,
                },
                raw: false
            })
            if (parseInt(classes.currentStudent) < parseInt(classes.maxStudent)) {
                let isExist = await db.ClassStudent.findOne({
                    where: {
                        classId: data.classId,
                        teacherId: data.teacherId,
                        studentId: data.studentId
                    },
                    raw: false
                })
                if (isExist) {
                    if (isExist.status == 'pending') {
                        resolve({
                            errCode: 1,
                            message: 'Bạn đã đăng ký lớp học này rồi!'
                        })
                    }
                    if (isExist.status == 'approved') {
                        resolve({
                            errCode: 2,
                            message: 'Bạn đã ở trong lớp này rồi!'
                        })
                    }
                    if (isExist.status == 'removed') {
                        resolve({
                            errCode: 3,
                            message: 'Bạn không thể gia nhập lớp này',
                            reason: isExist.reason
                        })
                    }
                } else {
                    try {
                        await db.ClassStudent.create({
                            classId: data.classId,
                            teacherId: data.teacherId,
                            studentId: data.studentId,
                            status: 'pending',
                            reason: '',
                        })
                        await db.Notification.create({
                            userId: data.teacherId,
                            status: 'warning',
                            content: `Bạn có yêu cầu đăng ký học mới từ lớp học "${classes.title}"`,
                            type: "unsee",
                        })
                        resolve({
                            errCode: 0,
                            message: 'Đã đăng ký thành công',
                        })

                    } catch (e) {
                        reject(e);
                    }
                }
            } else {
                resolve({
                    errCode: 4,
                    message: 'Lớp học đã đầy!'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllClassByStudentId = (studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classes = '';
            classes = await db.ClassStudent.findAll({
                where: {
                    studentId: studentId,
                    status: 'approved'
                },
                order: [
                    ['updatedAt', 'DESC'],
                ],
                include: [{
                    model: db.Classes,
                }
                ],
                nest: true,
                raw: false
            })
            resolve(classes)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewClass: createNewClass,
    finishClass: finishClass,
    approveClass: approveClass,
    deleteClass: deleteClass,
    enrollNewStudent: enrollNewStudent,
    getAllStudentByClassId: getAllStudentByClassId,
    approveStudent: approveStudent,
    denyStudent: denyStudent,
    getAllClassByStudentId: getAllClassByStudentId,
}