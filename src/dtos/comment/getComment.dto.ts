import z from 'zod'
import { CommentModel } from '../../models/Comment'

export interface GetCommentInputDTO {
    token: string
}

export type GetCommentOutputDTO = CommentModel[]

export const getCommentSchema = z.object({
    token: z.string().min(1)
})