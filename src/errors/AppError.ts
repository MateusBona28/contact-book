class AppError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number = 400, error: boolean = false){
        super()
        this.message = message
        this.statusCode = statusCode || 400
    }
}

export default AppError