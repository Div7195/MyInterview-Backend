import express from 'express';
import { signupUserController,loginUserController } from '../controllers/user-controller.js';
import { createPostController,createCompanyController ,getAllPostsController, findCompanyController, getSinglePostController, getMyPostsController, updatePostController, deletePostController, postCommentController,getCommentsController} from '../controllers/post-controllers.js';
import { authenticateToken } from '../controllers/jwt-controllers.js';

const router=express.Router();

router.post('/signup',signupUserController);
router.post('/login',loginUserController);
router.post('/create',authenticateToken,createPostController)
router.post('/createcompany',authenticateToken,createCompanyController)
router.get('/posts' , authenticateToken , getAllPostsController);
router.get('/post/:id',authenticateToken , getSinglePostController);
router.get('/personal/posts', authenticateToken, getMyPostsController)
router.put('/update/:id',authenticateToken , updatePostController)
router.delete('/delete/:id',authenticateToken, deletePostController);
router.post('/postcomment', authenticateToken, postCommentController)
router.get('/comments/:id',authenticateToken, getCommentsController);
router.get('/companyImage',authenticateToken , findCompanyController)
export default router