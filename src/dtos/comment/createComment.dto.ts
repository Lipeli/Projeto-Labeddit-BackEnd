import z from 'zod'

export interface CreateCommentInputDTO {
    conteudo: string,
    token: string
}
export type CreateCommentOutputDTO = undefined

export const CreateCommenttSchema = z.object({
    conteudo: z.string().min(1),
    token: z.string().min(1)
})