import express from "express";
import userController from "../controllers/user.controller.js";
import validation from "../middlewares/validations.middleware.js";
const router = express.Router();

router.post(
    "/signup",
    validation.validateSignUpPayload,
    userController.signUp
);

router.post(
    "/signin",
    validation.validateSignInPayload,
    userController.signIn
)

export default router;