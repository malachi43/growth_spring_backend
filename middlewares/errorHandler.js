import joiPkg from "joi"
const { ValidationError } = joiPkg;

const errorHandler = (err, req, res, next) => {
    console.log(err);
    //this field (errorResponse) is created by mongoose when an error occurs.
    const { errorResponse } = err

    const errorObj = {
        error_code: err.statusCode ?? err.errorCode ?? 500,
        message: err.message ?? "Internal Server Error",
        success: false
    }

    if (err instanceof ValidationError) {
        errorObj.error_code = 400;
    }

    if (errorResponse) {
        let { code, keyValue } = errorResponse
        let key = Object.keys(keyValue);
        let value = Object.values(keyValue);

        //checks for duplicate
        if (code === 11000) {
            keyValue = JSON.stringify(keyValue, null, 2);
            errorObj.error_code = 400;
            errorObj.message = `${key}:${value} already exists.`
        }

    }

    res.status(errorObj.error_code).json(errorObj);
}

export default errorHandler;