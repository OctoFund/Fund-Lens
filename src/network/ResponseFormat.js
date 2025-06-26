class ResponseFormat {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    toObject = () => {
        return {
            "code": this.code,
            "message": this.message,
            "data": this.data
        }
    }
}

export default ResponseFormat;