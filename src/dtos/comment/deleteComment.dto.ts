import z from 'zod'

export interface DeleteCommentInputDTO {
    token: string,
    idToDelte: string
}

export type DeleteCommenttOutputDTO = undefined

export const DeleteCommentSchema = z.object({
    token: z.string().min(1),
    idToDelte: z.string().min(1)
})