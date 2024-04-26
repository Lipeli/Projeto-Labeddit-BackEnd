import z from 'zod'

export interface LoginInputDTO {
    email: string,
    senha: string
}

export interface LoginOutputDTO {
    token: string
}

export const LoginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(4)
}).transform(data => data as LoginInputDTO)