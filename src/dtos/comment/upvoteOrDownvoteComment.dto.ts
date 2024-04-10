import z from 'zod'

export interface UpvoteOrDownvoteCommentInputDTO {
    postId: string,
    token: string,
    upvote: boolean
}

export type UpvoteOrDownvoteCommentOutputDTO = undefined

export const UpvoteOrDownvoteCommentSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    upvote: z.boolean()
})