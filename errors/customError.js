
class BadRequestError extends Error {
    constructor(message, errorCode) {
        super(message)
        this.errorCode = errorCode;
    }
}

export { BadRequestError }