import z from 'zod'

export interface EditPostInputDTO {
    conteudo: string,
    token: string,
    idToEdit: string
}

export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
    conteudo: z.string().min(1),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
})