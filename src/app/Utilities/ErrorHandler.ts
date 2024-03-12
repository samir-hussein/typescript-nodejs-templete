class ErrorHandler{
    constructor(err,req,res)
    {
        let accept = req.headers.accept;
    
        if (accept != 'application/json'){
            return res.status(500).sendFile(process.env.STATIC_DIR + '/views/500.html');
        }

        if (err.name === "ValidationError" && err.details) {
            return res.status(422).json({
                "status": "error",
                "errors": this.getErrorMessages(err.details)
            });
        }

        console.error(err.stack);
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            status: "error",
            message: message
        });
    }

    getErrorMessages(err: Array<{context:{label:string},message:string}>)
    {
        var data = {};

        for (const key in err) {
            data[err[key].context.label] = err[key].message;
        }

        return data;
    }
}

export default ErrorHandler;