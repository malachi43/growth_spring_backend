import { Schema, model } from "mongoose";
import bcryptPkg from "bcryptjs";
const { hash, compare, genSalt } = bcryptPkg;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const saltRound = 16;
        const salt = await genSalt(saltRound);
        this.password = await hash(this.password, salt);
    }
})

userSchema.methods.comparePassword = async function (userPassword) {
    return await compare(userPassword, this.password);
}

userSchema.methods.toJSON = function () {
    return {
        fullname: this.fullname,
        email: this.email,
        businessName: this.businessName
    }
}


export default model("User", userSchema);