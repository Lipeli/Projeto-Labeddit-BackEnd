import z from 'zod'

export interface CreatePostInputDTO {
    conteudo: string,
    token: string
}
export type CreatePostOutputDTO = undefined

export const CreatePostSchema = z.object({
    conteudo: z.string().min(1),
    token: z.string().min(1)
})