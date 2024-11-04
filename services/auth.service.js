import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";
import otpService from "./otp.service.js";
import emailService from "./email.service.js";
import { BadRequestError } from "../errors/customError.js";


class AuthService {
    async register(userData, verficationLink) {
        try {
            const { fullname, businessName, email, password } = userData;

            const user = new User({
                fullname,
                businessName,
                email,
                password
            })

            const registeredUser = await user.save();

            const companyName = "GROWTH SPRING";
            const subject = `Verification Email (${companyName})`;
            const content = `Thank you for signing up with ${companyName}.\nVerify your email by clicking on the link: ${verficationLink}`

            //send otp to user email.
            const emailServiceResponse = await emailService.sendVerificationEmail({
                to: email,
                subject,
                content
            })

            return {
                data: registeredUser,
                message: `${emailServiceResponse}`,
                success: true
            }

        } catch (error) {
            throw error
        }


    }
    async sendLoginOTP(email) {
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) throw new BadRequestError("invalid email", 400);

            const duration = 1000 * 60 * 5; //5 minutes.
            const otp = otpService.generateOTP();
            //set otp to expire in 5 minutes.
            const otpExpirationTime = new Date(Date.now() + duration).getTime();
            await Otp.create({ userId: existingUser._id, otp, otpExpirationTime });

            const subject = "OTP verification";
            const companyName = "GROWTH SPRING"
            const content = `Welcome to ${companyName}.\nAs an added security feature, you are requested to enter the one-time password (OTP) provided in this email to complete your signup process.\nThe OTP code is: ${otp}\nThis OTP will expire in 5 minutes.`
            
            const otpServiceResponse = await emailService.sendOTPEmail({
                to: email,
                subject,
                content
            })

            return {
                message: otpServiceResponse,
                success: true
            }
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
    async createLoginToken({ email, otp, password }) {
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) throw new BadRequestError("invalid email");

            const isPasswordValid = await existingUser.comparePassword(password);

            if (!isPasswordValid) throw new BadRequestError("invalid email or password", 400);

            const userOtp = await Otp.findOne({ userId: existingUser._id, otp });
            if (!userOtp) throw new BadRequestError("invalid otp", 400);
            const now = Date.now();
            if (userOtp.otpExpirationTime > now) {
                //delete otp from database, since it has already been used to generate a token.
                await Otp.deleteOne({ userId: existingUser._id, otp });
                const token = jwt.sign({ userId: existingUser._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
                return {
                    token,
                    data: existingUser,
                    success: true,
                    message: "login token generated successfully."
                }
            } else {
                //delete otp from database since it's expired.
                await Otp.deleteOne({ userId: existingUser._id, otp });
                throw new BadRequestError("otp expired", 400);
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async forgetPassword(email) {
        try {
            const passwordResetOtp = otpService.generateOTP();
            const companyName = "GROWTH_SPRING";
            const subject = "Password Reset"
            const content = `Welcome to ${companyName}.\nYou are requested to enter the one-time password (OTP) provided in this email to complete your password reset process.\nThe OTP code is: ${passwordResetOtp}\nOTP will expire in 5 minutes.`

            const existingUser = await User.findOne({ email });

            if (!existingUser) throw new BadRequestError("invalid email", 400);

            const duration = 1000 * 60 * 5; //5 minutes.

            //set otp to expire in 5 minutes.
            const otpExpirationTime = new Date(Date.now() + duration).getTime();
            await Otp.create({ userId: existingUser._id, otpExpirationTime, otp: passwordResetOtp });

            //send otp to the provided user email.
            const emailServiceResponse = await emailService.sendOTPEmail({
                to: email,
                subject,
                content
            })

            return {
                data: email,
                message: emailServiceResponse,
                success: true,
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async resetPassword({ otp: submittedOtp, password, email }) {
        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) throw new BadRequestError("invalid email");

            //retrieve stored otp.
            const { otp: storedOtp, otpExpirationTime } = await Otp.findOne({ userId: existingUser._id, otp: submittedOtp });

            //get current date in milliseconds.
            const now = Date.now();

            if (otpExpirationTime > now) {
                await Otp.findOneAndDelete({ userId: existingUser._id, otp: storedOtp });

                //hash password.
                const hashedPassword = await existingUser.hashPassword(password);
                
                //update user password.
                await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } }, { runValidators: true });
            } else {
                await Otp.findOneAndDelete({ userId: existingUser._id, otp: storedOtp });
                throw new BadRequestError("otp expired");
            }


            return {
                data: email,
                message: "password reset successful.",
                success: true,
            }


        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}


export default new AuthService();