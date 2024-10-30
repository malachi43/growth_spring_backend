import User from "../models/user.model.js";
import { BadRequestError } from "../errors/customError.js";

class UserController {

    async signUp(req, res) {
        const { fullname, businessName, email, password } = req.body

        const user = new User({
            fullname,
            businessName,
            email,
            password
        })

        await user.save();

        res.status(201).json({ data: user, success: true });
    }

    async signIn(req, res) {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })

        if (!existingUser) throw new BadRequestError("invalid email or password", 400)

        const isPasswordValid = await existingUser.comparePassword(password)

        if (!isPasswordValid) throw new BadRequestError("invalid email or password", 400)

        res.status(200).json({ data: req.body, success: true });
    }
}





export default new UserController();