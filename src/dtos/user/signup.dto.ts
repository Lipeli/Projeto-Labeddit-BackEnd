import z from 'zod'

export interface SignupInputDTO {
    apelido: string,
    email: string,
    senha: string
}

export interface SignupOutputDTO {
    token: string
}

export const SignupSchema = z.object({
    apelido: z.string().min(1),
    email: z.string().email(),
    senha: z.string().min(4)
}).transform(data => data as SignupInputDTO)