import z from 'zod'

export interface createPostInputDTO {
    conteudo: string,
    token: string
}

export type createPostOutputDTO = undefined

export const createPostSchema = z.object({
    conteudo: z.string().min(2),
    token: z.string().min(1)
})