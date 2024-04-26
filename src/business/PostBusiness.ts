import { string } from "zod";
import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { POST_UPVOTE, Post, UpvoteDownvoteDB } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { UpvoteOrDownvotePostInputDTO, UpvoteOrDownvotePostOutputDTO } from "../dtos/post/upvoteOrDownvotePost.dto";
import { NotFoundError } from "../errors/NotFoundError";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (
        input: CreatePostInputDTO
    ): Promise<CreatePostOutputDTO> => {
        const { conteudo, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            payload.id,
            payload.apelido,
            conteudo,
            0,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const postDB = post.toDBModel()
    
        await this.postDatabase.insertPost(postDB)

        const output: CreatePostOutputDTO = undefined

        return output
    }

    public getPosts = async (
        input: GetPostInputDTO
    ): Promise<GetPostOutputDTO> => {
        const { token } = input
        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postsDBWithCreatorName = await this.postDatabase.getPostsWithCreatorNickname()

        const posts = postsDBWithCreatorName.map((postDBWithCreatorNickname) => {
            const post = new Post(
                postDBWithCreatorNickname.id,
                postDBWithCreatorNickname.creator_id,
                postDBWithCreatorNickname.apelido,
                postDBWithCreatorNickname.conteúdo,
                postDBWithCreatorNickname.downvote,
                postDBWithCreatorNickname.upvote,
                postDBWithCreatorNickname.comments,
                postDBWithCreatorNickname.created_at,
                postDBWithCreatorNickname.updated_at,
            )
            return post.toBusinessModel()
        })

        const output: GetPostOutputDTO = posts

        return output
    }

    public upvoteOrDownvotePost = async (
        input: UpvoteOrDownvotePostInputDTO
    ): Promise<UpvoteOrDownvotePostOutputDTO> => {
        const { token, upvote, postId } = input
        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postDBWithCreatorNickname =
            await this.postDatabase.findPostWithCreatorDBById(postId)

        if (!postDBWithCreatorNickname) {
            throw new NotFoundError("O post com esse id não existe")
        }

        const post = new Post(
            postDBWithCreatorNickname.id,
            postDBWithCreatorNickname.creator_id,
            postDBWithCreatorNickname.apelido,
            postDBWithCreatorNickname.conteúdo,
            postDBWithCreatorNickname.downvote,
            postDBWithCreatorNickname.upvote,
            postDBWithCreatorNickname.comments,
            postDBWithCreatorNickname.created_at,
            postDBWithCreatorNickname.updated_at,
        )

        const upvoteSQlite = upvote ? 1 : 0

        const upvoteDownvoteDB: UpvoteDownvoteDB = {
            voter_id: payload.id,
            post_id: postId,
            direction: upvoteSQlite
        }

        const upvoteDownvoteExists = await this.postDatabase.findUpvoteDownvote(upvoteDownvoteDB)
        console.log(POST_UPVOTE.ALREADY_UPVOTED)
        if (upvoteDownvoteExists === POST_UPVOTE.ALREADY_UPVOTED) {
            if (upvote) {
                await this.postDatabase.removeUpvoteDownvote(upvoteDownvoteDB)
                post.removeUpvote()
            } else {
                await this.postDatabase.updateUpvoteDownvote(upvoteDownvoteDB)
                post.removeUpvote()
                post.addDownvote()
            }
        } else if (upvoteDownvoteExists === POST_UPVOTE.ALREADY_DOWNVOTED) {
            if (upvote === false) {
                await this.postDatabase.removeUpvoteDownvote(upvoteDownvoteDB)
                post.removeDownvote()
            } else {
                await this.postDatabase.updateUpvoteDownvote(upvoteDownvoteDB)
                post.removeDownvote()
                post.addUpvote()
            }
        } else {
            await this.postDatabase.insertUpvoteDownvote(upvoteDownvoteDB)
            upvote ? post.addUpvote() : post.addDownvote()
        }
        await this.postDatabase.updatePostUpvoteDownvote(post.toDBModel())

    const output: UpvoteOrDownvotePostOutputDTO = undefined

        return output
    }
}

