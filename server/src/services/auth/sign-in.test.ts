import { describe, it, expect } from "vitest";

import { User } from "../../entities/user";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { CreateUser } from "../user/create-user";
import { Signin } from "./sign-in";

describe('Sign-in tests', () => {
    const repository = new InMemoryUserRepository()
    it('Should successfully sign-in', async () => {
        const exampleUser = new User({
            birthDay: new Date(),
            currentGrade: 0,
            currentGraduation: 'branca',
            name: 'John Doe',
            password: 'password#123'
        })
        const createUser = new CreateUser(repository)
        await createUser.execute(exampleUser)
        const signIn = new Signin(repository)
        const {user, validPassword} = await signIn.execute(exampleUser.name, exampleUser.password)
        expect(user).toBeInstanceOf(User)
        expect(validPassword).toBeTruthy()
    })
})