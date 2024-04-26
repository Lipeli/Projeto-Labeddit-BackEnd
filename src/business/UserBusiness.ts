import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {apelido, email, senha} = input
        
        const id = this.idGenerator.generate()
        
        const hashedSenha = await this.hashManager.hash(senha)

        const user = new User(
            id,
            apelido,
            email,
            hashedSenha,
            new Date().toISOString()
        )
        const userDB = user.toDBModel()
        await this.userDatabase.insertUser(userDB)

        const payload: TokenPayload = {
            id: user.getId(),
            apelido: user.getApelido(),
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token: token
        }

        return output
    }

    public login = async (
        input: LoginInputDTO): Promise<LoginOutputDTO> => {
            const {email, senha} = input

            const userDB = await this.userDatabase.findUserByEmail(email)

            if (!userDB) {
                throw new NotFoundError("email nao foi cadastrado")
            }

            const user = new User(
                userDB.id,
                userDB.apelido,
                userDB.email,
                userDB.senha,
                userDB.created_at
            )

            const hashedSenha = user.getSenha()
            const isSenhaCorrect = await this.hashManager
            .compare(senha, hashedSenha)

            if (!isSenhaCorrect) {
                throw new BadRequestError("Email e/ou Senha Incorreto(a)")
            }

            const payload: TokenPayload = {
                id: user.getId(),
                apelido: user.getApelido(),
            }

            const token = this.tokenManager.createToken(payload)

            const output: LoginOutputDTO = {
                token
            }

            return output
        }
}