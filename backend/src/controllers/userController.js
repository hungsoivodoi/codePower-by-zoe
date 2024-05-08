import userService from '../services/userService';
import db from '../models/index';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    });
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing',
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await userService.editUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleGetAllTeachers = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing',
        })
    }
    let teachers = await userService.getAllTeachers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        teachers
    })
}

let handleRegister = async (req, res) => {
    let message = await userService.createNewUserPending(req.body);
    return res.status(200).json(message);
}

let handleGetAllUserPending = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing',
        })
    }
    let users = await userService.getAllUserPending(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

let approvePendingUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let message = await userService.approvePendingUser(req.body.id);
    return res.status(200).json(message);
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllTeachers: handleGetAllTeachers,
    handleRegister: handleRegister,
    handleGetAllUserPending: handleGetAllUserPending,
    approvePendingUser: approvePendingUser,
}