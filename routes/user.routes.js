import express from 'express';
import isAuthenticated from '../middlewear/authenticated.js';
import {healthChecker, userRegister, userLogin, userProfile, userLogout, userFollow} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/healthCheck", healthChecker );
router.post("/user/register", userRegister );
router.post("/user/login", userLogin );
router.get("/user/profile", isAuthenticated, userProfile );
router.get("/user/logout",isAuthenticated, userLogout );
router.post("/user/follow/:id", isAuthenticated, userFollow)

export default router;