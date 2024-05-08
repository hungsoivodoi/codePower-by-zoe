import db from "../models/index"
const bcrypt = require('bcrypt');

let createNewClassNotification = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ClassNotification.create({
                classId: data.classId,
                title: data.title,
                content: data.content,
                status: data.status,
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


let editClassNotification = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.ClassNotification.findOne({
                where: { id: data.id },
                raw: false
            })
            if (notifications) {
                notifications.classId = data.classId,
                    notifications.title = data.title,
                    notifications.content = data.content,
                    notifications.status = data.status,

                    await notifications.save();
                resolve({
                    errCode: 0,
                    message: 'Notification Edited!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Notification Not Found',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllNotiByClassId = (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.ClassNotification.findAll({
                where: {
                    classId: classId
                },
                order: [
                    ['id', 'DESC'],
                ],
                raw: false
            })
            resolve(notifications)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteNotification = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.ClassNotification.findOne({
                where: { id: id }
            })
            if (!notifications) {
                resolve({
                    errCode: 2,
                    message: 'notification is not exist'
                })
            } else {
                await db.ClassNotification.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    message: 'notification deleted'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getClassContent = (classId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contents = await db.ClassContent.findOne({
                where: {
                    classId: classId
                },
                raw: false
            })
            resolve(contents)
        } catch (e) {
            reject(e);
        }
    })
}

let editClassContent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let classContents = await db.ClassContent.findOne({
                where: { classId: data.classId },
                raw: false
            })
            if (!classContents) {
                try {
                    await db.ClassContent.create({
                        classId: data.classId,
                        status: data.status,
                        w1L: data.w1L,
                        w1C: data.w1C,
                        w2L: data.w2L,
                        w2C: data.w2C,
                        w3L: data.w3L,
                        w3C: data.w3C,
                        w4L: data.w4L,
                        w4C: data.w4C,
                        w5L: data.w5L,
                        w5C: data.w5C,
                        w6L: data.w6L,
                        w6C: data.w6C,
                        w7L: data.w7L,
                        w7C: data.w7C,
                        w8L: data.w8L,
                        w8C: data.w8C,
                        w9L: data.w9L,
                        w9C: data.w9C,
                        w10L: data.w10L,
                        w10C: data.w10C,
                        w11L: data.w11L,
                        w11C: data.w11C,
                        w12L: data.w12L,
                        w12C: data.w12C,
                        w1M: data.w1M,
                        w2M: data.w2M,
                        w3M: data.w3M,
                        w4M: data.w4M,
                        w5M: data.w5M,
                        w6M: data.w6M,
                        w7M: data.w7M,
                        w8M: data.w8M,
                        w9M: data.w9M,
                        w10M: data.w10M,
                        w11M: data.w11M,
                        w12M: data.w12M,
                    })
                    resolve({
                        errCode: 0,
                        message: 'classcontent created',
                    })

                } catch (e) {
                    reject(e);
                }
            } else {
                classContents.classId = data.classId,
                    classContents.status = data.status,
                    classContents.w1L = data.w1L,
                    classContents.w1C = data.w1C,
                    classContents.w2L = data.w2L,
                    classContents.w2C = data.w2C,
                    classContents.w3L = data.w3L,
                    classContents.w3C = data.w3C,
                    classContents.w4L = data.w4L,
                    classContents.w4C = data.w4C,
                    classContents.w5L = data.w5L,
                    classContents.w5C = data.w5C,
                    classContents.w6L = data.w6L,
                    classContents.w6C = data.w6C,
                    classContents.w7L = data.w7L,
                    classContents.w7C = data.w7C,
                    classContents.w8L = data.w8L,
                    classContents.w8C = data.w8C,
                    classContents.w9L = data.w9L,
                    classContents.w9C = data.w9C,
                    classContents.w10L = data.w10L,
                    classContents.w10C = data.w10C,
                    classContents.w11L = data.w11L,
                    classContents.w11C = data.w11C,
                    classContents.w12L = data.w12L,
                    classContents.w12C = data.w12C,
                    classContents.w1M = data.w1M,
                    classContents.w2M = data.w2M,
                    classContents.w3M = data.w3M,
                    classContents.w4M = data.w4M,
                    classContents.w5M = data.w5M,
                    classContents.w6M = data.w6M,
                    classContents.w7M = data.w7M,
                    classContents.w8M = data.w8M,
                    classContents.w9M = data.w9M,
                    classContents.w10M = data.w10M,
                    classContents.w11M = data.w11M,
                    classContents.w12M = data.w12M,
                    await classContents.save();
                resolve({
                    errCode: 0,
                    message: 'classcontent Edited!'
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

let getAllNotiByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.Notification.findAll({
                where: {
                    userId: userId
                },
                order: [
                    ['id', 'DESC'],
                ],
                raw: false
            })
            resolve(notifications)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUnseeNotiByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.Notification.findAll({
                where: {
                    userId: userId,
                    type: "unsee"
                },
                order: [
                    ['id', 'DESC'],
                ],
                raw: false
            })
            resolve(notifications)
        } catch (e) {
            reject(e);
        }
    })
}

let seeNoti = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.Notification.findOne({
                where: { id: data.id },
                raw: false
            })
            if (notifications) {
                notifications.type = 'see',
                    await notifications.save();
                resolve({
                    errCode: 0,
                    message: 'noti watched'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'blog not found'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserNotification = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await db.Notification.findOne({
                where: { id: id }
            })
            if (!notifications) {
                resolve({
                    errCode: 2,
                    message: 'notification is not exist'
                })
            } else {
                await db.Notification.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    message: 'notification deleted'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewClassNotification: createNewClassNotification,
    editClassNotification: editClassNotification,
    getAllNotiByClassId: getAllNotiByClassId,
    deleteNotification: deleteNotification,
    getClassContent: getClassContent,
    editClassContent: editClassContent,
    getAllNotiByUserId: getAllNotiByUserId,
    getAllUnseeNotiByUserId: getAllUnseeNotiByUserId,
    seeNoti: seeNoti,
    deleteUserNotification: deleteUserNotification,
}