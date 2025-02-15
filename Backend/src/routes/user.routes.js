import { Router } from "express";
import { RegisterUser } from "../controllers/UserControllers/RegisterUser.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    RegisterUser
);

export default router;
