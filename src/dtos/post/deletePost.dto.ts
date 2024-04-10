import z from 'zod'

export interface DeletePostInputDTO {
    token: string,
    idToDelte: string
}

export type DeletePostOutputDTO = undefined

export const DeletePostSchema = z.object({
    token: z.string().min(1),
    idToDelte: z.string().min(1)
})