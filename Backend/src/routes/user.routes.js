import { Router } from "express";
import RegisterUser  from "../controllers/UserControllers/RegisterUser.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import LoginUser from "../controllers/UserControllers/LoginUser.controlller.js";
import LogoutUser from "../controllers/UserControllers/LogoutUser.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    RegisterUser
);

router.post("/login", LoginUser)
router.post("/logout", VerifyJWT,LogoutUser)

export default router;
