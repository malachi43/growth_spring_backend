import express from "express";
import authController from "../controllers/auth.controller.js";
import validation from "../middlewares/validations.middleware.js";
const router = express.Router();

router.post(
    "/signup",
    validation.validateSignUpPayload,
    authController.signUp
);

router.post(
    "/forgot-password",
    validation.validateForgotPasswordPayload,
    authController.forgotPassword
)

router.post(
    "/reset-password",
    validation.validateResetPasswordPayload,
    authController.resetPassword
)

router.get(
    "/otp",
    authController.sendLoginOtp
)

router.post(
    "/create-login-token",
    validation.createLoginTokenPayload,
    authController.createLoginToken
)

export default router;