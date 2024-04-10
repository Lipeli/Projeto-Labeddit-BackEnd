import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_UPVOTE_DOWNVOTE = "upvote_downvote"
}