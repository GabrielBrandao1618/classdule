import { compare } from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken'

import { User } from '../../entities/user';
import {UserRepositoryBase} from '../../repositories/user-repository'

interface Response {
    validPassword: boolean;
    user: User;
    token: string
}
export class Signin {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository
    }
    async execute(username:string, password: string): Promise<Response>{
        const user = await this.repository.findUserByName(username)
        if(!user){
            throw new Error('User not found')
        }
        const isPasswordValid = await compare(password, user.password)
        if(!isPasswordValid){
            throw new Error('Invalid password')
        }
        const token = jwt.sign(
            {name: user.name, id: user.id}, 
            process.env.JWT_TOKEN_SECRET as Secret, 
            {expiresIn: '1h'}
        )
        return {
            validPassword: isPasswordValid,
            user: user,
            token
        }
    }
}