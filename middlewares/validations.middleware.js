import Joi from "joi";

class Validations {
    async validateSignUpPayload(req, res, next) {
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

    async validateSignInPayload(req, res, next) {
        const signInSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "gov"] } }).required().messages({
                "any.required": "email is required"
            }),
            password: Joi.string().required().messages({
                "any.required": "password is required"
            })
        })

        await signInSchema.validateAsync(req.body, { abortEarly: false });
        next()
    }
}

export default new Validations()
