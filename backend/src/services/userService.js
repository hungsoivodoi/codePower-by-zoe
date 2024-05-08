import db from "../models/index"
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

let SimpleNodeMailer = async (email) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'tungchuthanh1234@gmail.com',
            pass: 'hermann300401',
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Chu Thanh Tùng 👻" <tungchuthanh1234@gmail.com>', // sender address
        to: 'missladie1234@gmail.com', // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist == true) {
                //user exist!

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id', 'image'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0,
                            userData.message = 'verified',
                            delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3,
                            userData.message = 'wrong password';
                    }
                    resolve(userData)
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found'
                }
            } else {
                let userPending = await db.PendingUser.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id', 'image'],
                    where: { email: email },
                    raw: true,
                });
                if (userPending) {
                    userData.errCode = 4,
                        userData.message = 'Tài khoản của bạn đang được duyệt!';
                    resolve(userData)
                } else {
                    userData.errCode = 1;
                    userData.message = "Your email does not exist in our system. Try again"
                    resolve(userData);
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmailPending = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.PendingUser.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUserPending = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.PendingUser.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    nest: true,
                    raw: false
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.PendingUser.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    nest: true,
                    raw: false
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    include: [{
                        model: db.Classes,
                    }],
                    nest: true,
                    raw: false
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [{
                        model: db.Classes,
                    }],
                    nest: true,
                    raw: false
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist?
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'email existed, choose another email',
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender == 1 ? true : false,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                    speciality: data.speciality,
                    image: data.image,
                })

                resolve({
                    errCode: 0,
                    message: 'OK',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUserPending = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email exist?
            let check = await checkUserEmail(data.email);
            let check2 = await checkUserEmailPending(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Email này đã được đăng ký',
                })
            } else if (check2) {
                resolve({
                    errCode: 1,
                    message: 'Tài khoản này đang được duyệt',
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.PendingUser.create({
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender == '1' ? true : false,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                    speciality: data.speciality,
                    image: data.image,
                })

                resolve({
                    errCode: 0,
                    message: 'Đăng ký tài khoản thành công! Chờ duyệt ...',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const saltRounds = 10;
            let hashPassword = bcrypt.hash(password, saltRounds);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let approvePendingUser = (pendingUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.PendingUser.findOne({
                where: { id: pendingUserId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User is not exist'
                })
            } else {
                await db.PendingUser.destroy({
                    where: { id: pendingUserId }
                });
                await db.User.create({
                    password: user.password,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    gender: user.gender,
                    roleId: user.roleId,
                    phoneNumber: user.phoneNumber,
                    positionId: user.positionId,
                    speciality: user.speciality,
                    image: user.image,
                })
                resolve({
                    errCode: 0,
                    message: 'User deleted'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User is not exist'
                })
            } else {
                await db.User.destroy({
                    where: { id: userId }
                });
                resolve({
                    errCode: 0,
                    message: 'User deleted'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                data.firstName ? user.firstName = data.firstName : '',
                    data.lastName ? user.lastName = data.lastName : '',
                    data.address ? user.address = data.address : '',
                    user.gender = data.gender,
                    data.roleId ? user.roleId = data.roleId : '',
                    data.phoneNumber ? user.phoneNumber = data.phoneNumber : '',
                    data.positionId ? user.positionId = data.positionId : '',
                    data.speciality ? user.speciality = data.speciality : '',
                    data.image ? user.image = data.image : '',

                    await user.save();
                resolve({
                    errCode: 0,
                    message: 'User updated'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'User not found'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllTeachers = (teacherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = '';
            if (teacherId === 'ALL') {
                teachers = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    where: {
                        roleId: 'R2'
                    },
                    include: [{
                        model: db.TeacherRating,
                    },
                    {
                        model: db.Classes,
                    },
                    ],
                    nest: true,
                    raw: false
                })
            }
            if (teacherId && teacherId !== 'ALL') {
                teachers = await db.User.findOne({
                    where: { id: teacherId },
                    include: [{
                        model: db.TeacherRating,
                    }],
                    attributes: {
                        exclude: ['password']
                    },
                    nest: true,
                    raw: false,
                })
            }
            resolve(teachers)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllTeachers: getAllTeachers,
    createNewUserPending: createNewUserPending,
    getAllUserPending: getAllUserPending,
    approvePendingUser: approvePendingUser,
}