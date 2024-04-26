export interface PostDB {
    id: string,
    creator_id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    comments: number,
    created_at: string,
    updated_at: string,
}

export interface PostDBWithCreatorNickname {
    id: string,
    creator_id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    comments: number,
    created_at: string,
    updated_at: string,
    apelido: string
}

export interface PostModel {
    id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        apelido: string
    },
}

export interface UpvoteDownvoteDB{
    voter_id: string,
    post_id: string,
    direction: number
} 

export enum POST_UPVOTE {
    ALREADY_UPVOTED = "ALREADY UPVOTED",
    ALREADY_DOWNVOTED = "ALREADY DOWNVOTED"
}

export class Post {
    constructor(
        private id: string,
        private creatorID: string,
        private apelidoCreator: string,
        private conteúdo: string,
        private downvote: number,
        private upvote: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getCreatorId(): string {
        return this.creatorID
    }

    public setCreatorId(value: string): void {
        this.creatorID = value
    }

    public getApelidoCreator(): string {
        return this.apelidoCreator
    }

    public setApelidoCreator(value: string): void {
        this.apelidoCreator = value
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

    public addUpvote(): void {
        this.upvote++
    }

    public removeUpvote(): void {
        this.upvote--
    }

    public addDownvote(): void {
        this.downvote++
    }

    public removeDownvote(): void {
        this.downvote--
    }

    public getComments(): number {
        return this.comments
    }

    public setComments(value: number): void {
        this.comments = value
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

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorID,
            conteúdo: this.conteúdo,
            downvote: this.downvote,
            upvote: this.upvote,
            comments: this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        }

    
    }
    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            conteúdo: this.conteúdo,
            downvote: this.downvote,
            upvote: this.upvote,
            comments: this.comments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorID,
                apelido: this.apelidoCreator
            },
        }
    }
}
