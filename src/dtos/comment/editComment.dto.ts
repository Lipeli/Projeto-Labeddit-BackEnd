import z from 'zod'

export interface EditCommentInputDTO {
    conteudo: string,
    token: string,
    idToEdit: string
}

export type EditCommentOutputDTO = undefined

export const editCommenttSchema = z.object({
    conteudo: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
})