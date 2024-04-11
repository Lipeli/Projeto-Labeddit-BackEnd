import { UserDatabase } from "../database/UserDatabase";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
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
}