import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import { TGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import ApiError from "../../errors/ApiError";



const globalErrorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    config.env !== 'production' ? 
    console.log("🚀 ~ globalErrorHandler:", error) : 
    console.log("🚀 ~ globalErrorHandler:", error);

    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages: TGenericErrorMessage[] = [];
    
    if(error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;        
    }else if(error instanceof ZodError){
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;        
    }else if(error instanceof ApiError){
        statusCode = error?.statusCode;
        message = error?.message;
        errorMessages = error?.message ? [
            {
                path: '',
                message: error?.message,
            }
        ] : [];        
    }else if(error instanceof Error){
        message = error?.message;
        errorMessages = error?.message ? [
            {
                path: '',
                message: error?.message,
            }
        ] : [];      
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? error?.stack : undefined,
    })

    next();
};

export default globalErrorHandler;
