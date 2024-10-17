
class ApiError extends Error{

    constructor(statusCode, message="something went wrong", error=[], stack=""){
        super(message);
        this.error = error;
        this.data = null;
        this.message = message;
        this.statusCode = statusCode;
        this.status =  statusCode >=400 && statusCode <=499 ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }


}

module.exports = ApiError;
