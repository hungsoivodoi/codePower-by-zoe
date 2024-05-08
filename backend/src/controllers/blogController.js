import blogServices from '../services/blogServices';
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

let handleSaveBlogInfor = async (req, res) => {
    try {
        let response = await blogServices.saveBlogInfor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: 'Cant save blog informations',
        })
    }
}

let handleApproveBlog = async (req, res) => {
    if (!req.body.blogId) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await blogServices.approveBlog(data);
    return res.status(200).json(message);
}

let handlePendingBlog = async (req, res) => {
    if (!req.body.blogId) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let data = req.body;
    let message = await blogServices.pendingBlog(data);
    return res.status(200).json(message);
}


let handleDeleteBlog = async (req, res) => {
    if (!req.body.blogId) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Input Parameter'
        })
    }
    let message = await blogServices.deleteBlog(req.body.blogId);
    return res.status(200).json(message);
}

let handleUpdateBlog = async (req, res) => {
    if (!req.body.id) {
        console.log(req.body);
        return res.status(200).json({
            errCode: 1,
            message: 'Missing Blog Id Parameter'
        })
    }
    let data = req.body;
    let message = await blogServices.editBlog(data);
    return res.status(200).json(message);
}

let handleGetAllBlogs = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing id',
        })
    }
    let blogs = await blogServices.getAllBlogs(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        blogs
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleSaveBlogInfor: handleSaveBlogInfor,
    handleApproveBlog: handleApproveBlog,
    handleGetAllBlogs: handleGetAllBlogs,
    handlePendingBlog: handlePendingBlog,
    handleDeleteBlog: handleDeleteBlog,
    handleUpdateBlog: handleUpdateBlog,
}