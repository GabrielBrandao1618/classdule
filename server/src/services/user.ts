import { hash } from "bcrypt"

import { prismaClient } from "../database/prisma";

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}

export async function createUser(name: string, birthDay: Date, password:string){
    const encryptedPassword = await hash(password, 10)
    const usernameAlreadyUsed = await getUserByName(name)
    if(!!usernameAlreadyUsed){
        return {
            message: 'Username already in use',
            createdUser: null
        }
    }
    const createdUser = await prismaClient.user.create({data: {
        birthDay: birthDay,
        name:name,
        currentGraduation: {
            connectOrCreate: {
                create: {
                    name: 'branca',
                    value: 0
                },
                where: {
                    name: 'branca'
                }
            }
        },
        password: encryptedPassword
    }})
    return {
        message:'User created successfully',
        createdUser
    }
}

export async function getUserByName(name:string){
    const user = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    })
    return user
}

export async function changeUsername(id: string, name: string){
    const user = await prismaClient.user.update({
        data: {
            name: name
        },
        where: {
            id: id
        }
    })
    return user
}

export async function deleteUser(id:string){
    const deletedUser = await prismaClient.user.delete({
        where: {
            id:id
        }
    })
    return deletedUser
}