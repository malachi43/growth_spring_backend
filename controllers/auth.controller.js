import authService from "../services/auth.service.js";

class AuthController {

    async signUp(req, res) {
        const { email } = req.body;
        const verificationLink = `${req.protocol}://${req.headers.host}/auth/otp?email=${email}`;
        const data = await authService.register(req.body, verificationLink);
        res.status(201).json({ ...data });
    }


    async sendLoginOtp(req, res) {
        const { email } = req.query;
        const data = await authService.sendLoginOTP(email);
        res.status(200).json({ ...data });
    }

    async createLoginToken(req, res) {
        const { email, otp, password } = req.body;
        const data = await authService.createLoginToken({ email, otp, password });
        res.status(200).json({ ...data });
    }

    async forgotPassword(req, res) {
        const { email } = req.body
        const data = await authService.forgetPassword(email)
        res.status(200).json({ ...data });
    }

    async resetPassword(req, res) {
        const { otp, password, email } = req.body;
        const data = await authService.resetPassword({ otp, password, email });
        res.status(200).json({ ...data });
    }
}





export default new AuthController();