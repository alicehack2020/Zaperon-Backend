import express from "express"
const router=express.Router();
 
import UserController from "../controllers/userController.js"
import checkUserAuth from "../middlewares/auth-middleware.js";
//public routes
router.post("/login", UserController.userLogin);

//private route
router.get("/isLogin", checkUserAuth, UserController.isLogin);

router.get("/logout",UserController.logout);

export default router;
