export interface UserDB {
    id: string,
    apelido: string,
    email: string,
    senha: string,
    created_at: string
}

export interface UserModel {
    id: string,
    apelido: string,
    email: string,
    createdAt: string
}

export class User {
    constructor(
        private id: string,
        private apelido: string,
        private email: string,
        private senha: string,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getApelido(): string {
        return this.apelido
    }

    public setApelido(value: string): void {
        this.apelido = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }


    public getSenha(): string {
        return this.senha
    }

    public setPassword(value: string): void {
        this.senha = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            apelido: this.apelido,
            email: this.email,
            senha: this.senha,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            apelido: this.apelido,
            email: this.email,
            createdAt: this.createdAt
        }
    }
} 
