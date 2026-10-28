import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { AppError } from "./AppError.js";


export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {

    //Errores Personalizados
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            message: error.message,
            statusCode: error.statusCode
        })
    }


    //Errores de validacion con AJV

    if ((error as any).validation) {

        const validationErrors = (error as any).validation

        const formatErrors = validationErrors.map((err: any) => {
            return {
                field: getField(err),
                message: getMessage(err)
            }
        })

        return reply.status(400).send({
            statusCode: 400,
            message: "Error de validación",
            errors: formatErrors
        })
    }

    //Errores personalizados de validación
    if (error.statusCode) {

        return reply.status(error.statusCode).send({
            statusCode: error.statusCode,
            message: error.message
        })
    }

    //Error General 

    request.log.error(error)

    return reply.status(500).send({
        message: "Error interno en el servidor",
        statusCode: 500
    })
}

function getField(err: any): string {
    //Para body

    if (err.instancePath) {
        return err.instancePath.replace("/", "")
    }

    //Para required
    if (err.params?.missingProperty) {
        return err.params.missingProperty
    }
    return "unknown"
}

function getMessage(err: any): string {
    switch (err.keyword) {
        case "required":
            return `El campo ${err.params.missingProperty} es obligatorio`
        case "enum":
            return `Valor inválido. Opciones: ${err.params.allowedValues.join(", ")}`
        case "type":
            return "Tipo de dato inválido"
        case "minLength":
            return `El campo ${err.instancePath.replace("/", "")} minimo debe de contener ${err?.params?.limit} ${err?.params?.limit == 1 ? "carácter" : "caracteres"} `
        default:
            return "Dato inválido"
    }
}
