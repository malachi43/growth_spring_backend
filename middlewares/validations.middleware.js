import Joi from "joi";

class Validations {
    async validateSignUpPayload(req, _, next) {
        const signUpSchema = Joi.object({
            fullname: Joi.string().required().messages({
                "any.required": "fullname is required"
            }),
            businessName: Joi.string().required().messages({
                "any.required": "business name is required"
            }),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            }),
            password: Joi.string().required().messages({
                "any.required": "password is required"
            })
        })

        await signUpSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }

    async validateSignInPayload(req, _, next) {
        const signInSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            }),
            password: Joi.string().required().messages({
                "any.required": "password is required"
            }),
            otp: Joi.number().integer().max(999_999).required().messages({
                "any.required": "otp is required"
            })
        })

        await signInSchema.validateAsync(req.body, { abortEarly: false });
        next()
    }

    async validateForgotPasswordPayload(req, _, next) {
        const forgotPasswordSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            })
        })

        await forgotPasswordSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }

    async validateResetPasswordPayload(req, _, next) {
        const resetPasswordSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            }),
            password: Joi.string().required().messages({
                "any.required": "password is required"
            }),
            otp: Joi.number().integer().max(999_999).required().messages({
                "any.required": "otp is required"
            })
        })
        await resetPasswordSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }

    async createLoginTokenPayload(req, _, next) {
        const loginTokenSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            }),
            password: Joi.string().required().messages({
                "any.required": "password is required"
            }),
            otp: Joi.number().integer().max(999_999).required().messages({
                "any.required": "otp is required"
            })
        })

        await loginTokenSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }
}

export default new Validations()
