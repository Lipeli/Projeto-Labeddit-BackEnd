export interface commentDB {
    id: string,
    post_id: string,
    commenter_id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    created_at: string,
    updated_at: string
}

export interface CommentModel {
    id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    created_at: string,
    updated_at: string
    post_id: string,
    commenter: {
        id: string,
        apelidoCommenter: string,
    }
}

export class comment {
    constructor(
        private id: string,
        private postId: string,
        private commenterId: string,
        private apelidoCommenter: string,
        private conteúdo: string,
        private downvote: number,
        private upvote: number,
        private createdAt: string,
        private updatedAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getCommenterId(): string {
        return this.commenterId
    }

    public setCommenterId(value: string): void {
        this.commenterId = value
    }

    public getConteudo(): string {
        return this.conteúdo
    }

    public setConteudo(value: string): void {
        this.conteúdo = value
    }

    public getDownvote(): number {
        return this.downvote
    }

    public setDownvote(value: number): void {
        this.downvote = value
    }

    public getUpvote(): number {
        return this.upvote
    }

    public setUpvote(value: number): void {
        this.upvote = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    public toDBModel(): commentDB {
        return {
            id: this.id,
            post_id: this.postId,
            commenter_id: this.commenterId,
            conteúdo: this.conteúdo,
            downvote: this.downvote,
            upvote: this.upvote,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): CommentModel {
        return {
            id: this.id,
            conteúdo: this.conteúdo,
            downvote: this.downvote,
            upvote: this.upvote,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            post_id: this.postId,
            commenter: {
                id: this.commenterId,
                apelidoCommenter: this.apelidoCommenter,
            }
        }
    }
}
