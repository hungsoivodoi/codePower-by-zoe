import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import blogController from "../controllers/blogController";
import classController from "../controllers/classController";
import classStudentController from "../controllers/classStudentController";
import classUtilsController from "../controllers/classUtilsController"
import ratingController from "../controllers/ratingController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register-user', userController.handleRegister);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-all-users-pending', userController.handleGetAllUserPending);
    router.delete('/api/approve-user', userController.approvePendingUser);



    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-all-teachers', userController.handleGetAllTeachers);
    router.post('/api/save-blog-infor', blogController.handleSaveBlogInfor);
    router.put('/api/approve-blog', blogController.handleApproveBlog);
    router.put('/api/pending-blog', blogController.handlePendingBlog);
    router.get('/api/get-all-blogs', blogController.handleGetAllBlogs);
    router.delete('/api/delete-blog', blogController.handleDeleteBlog);
    router.put('/api/edit-blog', blogController.handleUpdateBlog);

    router.post('/api/create-new-class', classController.handleCreateClass);
    router.get('/api/get-all-class-by-teacherId', classController.hanldeGetAllClassesByTeacherId);
    router.put('/api/approve-class', classController.handleApproveClass);
    router.put('/api/pending-class', classController.handleFinishClass);
    router.delete('/api/delete-class', classController.handleDeleteClass);
    router.put('/api/edit-class', classController.handleUpdateClass);


    router.post('/api/enroll-student-class', classStudentController.handleEnrollStudent);
    router.get('/api/get-all-class-student', classStudentController.hanldeGetAllClassStudent);
    router.get('/api/get-all-student-class', classStudentController.hanldeGetAllStudentClass);

    router.put('/api/approve-student', classStudentController.handleApproveStudent);
    router.put('/api/deny-student', classStudentController.handleDenyStudent);

    router.get('/api/get-all-notification', classUtilsController.handleGetAllNotiByClassId);
    router.post('/api/create-new-notification', classUtilsController.handleCreateNewNoti);
    router.put('/api/edit-notification', classUtilsController.handleEditNotification);
    router.delete('/api/delete-notification', classUtilsController.handleDeleteNofitication);

    router.get('/api/get-all-classContent', classUtilsController.handleGetClassContent);
    router.put('/api/edit-classContent', classUtilsController.handleEditClassContent);

    router.get('/api/get-all-user-notification', classUtilsController.handleGetAllNotiByUserId);
    router.get('/api/get-all-un-see-user-notification', classUtilsController.handleGetAllUnseeNotiByUserId);


    router.put('/api/see-notification', classUtilsController.handleSeeNoti);
    router.delete('/api/delete-user-notification', classUtilsController.handleDeleteUserNofitication);

    router.put('/api/edit-rating', ratingController.handleEditRating);
    router.get('/api/get-all-class-rating', ratingController.handleGetClassRating);
    router.get('/api/get-all-teacher-rating', ratingController.handleGetTeacherRating);

    









    return app.use("/", router)
}

module.exports = initWebRoutes;