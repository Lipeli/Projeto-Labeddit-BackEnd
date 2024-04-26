import { POST_UPVOTE, PostDB, PostDBWithCreatorNickname, UpvoteDownvoteDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_UPVOTE_DOWNVOTE = "upvote_downvote_post"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPostsWithCreatorNickname = async (): Promise<PostDBWithCreatorNickname[]> => {
        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${UserDatabase.TABLE_USERS}.id`,
                `${UserDatabase.TABLE_USERS}.apelido`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.conteúdo`,
                `${PostDatabase.TABLE_POSTS}.downvote`,
                `${PostDatabase.TABLE_POSTS}.upvote`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
            )
            .join(
            `${UserDatabase.TABLE_USERS}`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDatabase.TABLE_USERS}.id`)
        
        return result as PostDBWithCreatorNickname[]

    }

    public findPostWithCreatorDBById = 
        async (id: string): Promise<PostDBWithCreatorNickname | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${UserDatabase.TABLE_USERS}.apelido`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.conteúdo`,
                `${PostDatabase.TABLE_POSTS}.downvote`,
                `${PostDatabase.TABLE_POSTS}.upvote`,
                `${PostDatabase.TABLE_POSTS}.comments`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
            )
            .join(
            `${UserDatabase.TABLE_USERS}`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDatabase.TABLE_USERS}.id`)
            .where({[`${PostDatabase.TABLE_POSTS}.id`]: id })
        return result as PostDBWithCreatorNickname | undefined
    }

    public findUpvoteDownvote = async (
        upvoteDownvoteDB: UpvoteDownvoteDB
    ):Promise<POST_UPVOTE | undefined> => {
        const [result]: Array<UpvoteDownvoteDB | undefined> = await BaseDatabase
        .connection(PostDatabase.TABLE_UPVOTE_DOWNVOTE)
        .select()
        .where({
            voter_id: upvoteDownvoteDB.voter_id,
            post_id: upvoteDownvoteDB.post_id
        })

        if (result === undefined){
            return undefined
        } else if (result.direction === 1) {
            return POST_UPVOTE.ALREADY_UPVOTED
        } else {
            return POST_UPVOTE.ALREADY_DOWNVOTED
        }
    }

    public removeUpvoteDownvote = async (upvoteDownvoteDB: UpvoteDownvoteDB        
    ): Promise<void> => {
        console.log(upvoteDownvoteDB)
        await BaseDatabase
        .connection(PostDatabase.TABLE_UPVOTE_DOWNVOTE)
        .delete()
        .where({
            voter_id: upvoteDownvoteDB.voter_id,
            post_id: upvoteDownvoteDB.post_id
        })
    }

    public updateUpvoteDownvote = async (upvoteDownvoteDB: UpvoteDownvoteDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_UPVOTE_DOWNVOTE)
        .update(upvoteDownvoteDB)
        .where({
            voter_id: upvoteDownvoteDB.voter_id,
            post_id: upvoteDownvoteDB.post_id
        })
    }

    public updatePostUpvoteDownvote = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({
            id: postDB.id,
        })
    }

    public insertUpvoteDownvote = async (upvoteDownvoteDB: UpvoteDownvoteDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_UPVOTE_DOWNVOTE)
        .insert(upvoteDownvoteDB)
    }
}