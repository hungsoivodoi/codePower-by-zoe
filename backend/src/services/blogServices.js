import db from "../models/index"
const bcrypt = require('bcrypt');

let saveBlogInfor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData || !inputData.writerId || !inputData.contentHTML || !inputData.contentMarkDown) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                await db.ForumDoc.create({
                    writerId: inputData.writerId,
                    status: 'pending',
                    contentHTML: inputData.contentHTML,
                    contentMarkDown: inputData.contentMarkDown,
                    title: inputData.title,
                    type: inputData.type,
                })

                resolve({
                    errCode: 0,
                    message: 'save blog success',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let approveBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.ForumDoc.findOne({
                where: { id: data.blogId },
                raw: false
            })
            if (blog) {
                if (blog.status == 'pending') {
                    blog.status = 'approved',

                        await blog.save();
                    await db.Notification.create({
                        userId: blog.writerId,
                        status: 'normal',
                        content: `Bài đăng "${blog.title}" của bạn đã được duyệt`,
                        type: "unsee",
                    })
                    resolve({
                        errCode: 0,
                        message: 'blog approved'
                    })
                }
                if (blog.status == 'updating') {
                    blog.status = 'approved',

                        await blog.save();
                    await db.Notification.create({
                        userId: blog.writerId,
                        status: 'normal',
                        content: `Yêu cầu chỉnh sửa bài đăng "${blog.title}" của bạn đã được duyệt`,
                        type: "unsee",
                    })

                    resolve({
                        errCode: 0,
                        message: 'blog approved'
                    })
                }
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

let pendingBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.ForumDoc.findOne({
                where: { id: data.blogId },
                raw: false
            })
            if (blog) {
                blog.status = 'pending',
                    await db.Notification.create({
                        userId: blog.writerId,
                        status: 'warning',
                        content: `Bài đăng "${blog.title}" của bạn đã bị đưa vào danh sách chờ duyệt`,
                        type: "unsee",
                    })

                await blog.save();
                resolve({
                    errCode: 0,
                    message: 'blog pending'
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

let deleteBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.ForumDoc.findOne({
                where: { id: blogId }
            })
            if (!blog) {
                resolve({
                    errCode: 2,
                    message: 'Blog is not exist'
                })
            } else {
                await db.ForumDoc.destroy({
                    where: { id: blogId }

                });
                await db.Notification.create({
                    userId: blog.writerId,
                    status: 'urgent',
                    content: `Bài đăng "${blog.title}" của bạn đã bị xóa`,
                    type: "unsee",
                })
                resolve({
                    errCode: 0,
                    message: 'Blog deleted'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let editBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.ForumDoc.findOne({
                where: { id: data.id },
                raw: false
            })
            if (blog && data.status == "updating") {
                blog.title = data.title,
                    blog.type = data.type,
                    blog.contentHTML = data.contentHTML,
                    blog.contentMarkDown = data.contentMarkDown,
                    blog.status = data.status,

                    await blog.save();
                resolve({
                    errCode: 0,
                    message: 'Blog updating ! await to be Approve'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Blog Not Found or Maybe Updating',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBlogs = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = '';
            if (blogId === 'ALL') {
                blogs = await db.ForumDoc.findAll({
                    order: [
                        ['id', 'DESC'],
                    ],
                })
            }
            else if (blogId && blogId == 'approved') {
                blogs = await db.ForumDoc.findAll({
                    where: { status: 'approved' },
                    order: [
                        ['id', 'DESC'],
                    ],
                })
            }
            else if (blogId && blogId == 'pending') {
                blogs = await db.ForumDoc.findAll({
                    where: { status: 'pending' },
                    order: [
                        ['id', 'DESC'],
                    ],
                })
            } else if (blogId && blogId == 'updating') {
                blogs = await db.ForumDoc.findAll({
                    where: { status: 'updating' },
                    order: [
                        ['id', 'DESC'],
                    ],
                })
            } else {
                blogs = await db.ForumDoc.findAll({
                    where: {
                        writerId: blogId,
                        status: 'approved'
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                })
            }
            resolve(blogs)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBlogsByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = '';
            if (!userId) {
                resolve({
                    errCode: 1,
                    message: 'no blog by this userFound'
                })
            } else {
                blogs = await db.ForumDoc.findAll({
                    where: {
                        writerId: userId,
                    }
                })
            }
            resolve(blogs)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    saveBlogInfor: saveBlogInfor,
    approveBlog: approveBlog,
    pendingBlog: pendingBlog,
    getAllBlogs: getAllBlogs,
    deleteBlog: deleteBlog,
    editBlog: editBlog,
}