class ApiResponse {
    construtor(statusCode, data, message="sucesss"){
        this.statusCode  = statusCode;
        this.status = statusCode >= 200 && statusCode <=299 ? "sucesss": "unexpected";
        this.message = message;
        this.data = data;
    }

}

module.exports = ApiResponse;