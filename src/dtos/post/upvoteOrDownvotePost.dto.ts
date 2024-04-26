import z from 'zod'

export interface UpvoteOrDownvotePostInputDTO {
    postId: string,
    token: string,
    upvote: boolean
}

export type UpvoteOrDownvotePostOutputDTO = undefined

export const UpvoteOrDownvotePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    upvote: z.boolean()
}).transform(data => data as UpvoteOrDownvotePostInputDTO)