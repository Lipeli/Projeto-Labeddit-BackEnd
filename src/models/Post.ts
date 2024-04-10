export interface PostDB {
    id: string,
    creator_id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    comments: string,
    created_at: string,
    updated_at: string,
}

export interface PostModel {
    id: string,
    conteúdo: string,
    downvote: number,
    upvote: number,
    comments: string,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        apelido: string
    },
}

export class Post {
    constructor(
        private id: string,
        private creatorID: string,
        private apelidoCreator: string,
        private conteúdo: string,
        private downvote: number,
        private upvote: number,
        private comments: string,
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

    public getComments(): string {
        return this.comments
    }

    public setComments(value: string): void {
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
