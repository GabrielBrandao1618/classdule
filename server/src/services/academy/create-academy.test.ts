import {describe, it, expect} from 'vitest'

import { v4 as uuid } from 'uuid'

import { Group } from "../../entities/academy"
import { InMemoryAcademyRepository } from "../../repositories/in-memory/in-memory-academy-repository"
import { CreateAcademy } from "./create-academy"

describe('Create academy tests', ()=> {
    it('Should be able to create an academy', async () => {
        const repository = new InMemoryAcademyRepository()
        const createAcademy = new CreateAcademy(repository)

        const exampleAcademy = new Group({
            educatorsIds: [],
            location: 'Nowhere',
            name: 'Academy 1',
            responsibleEducatorId: uuid()
        })
        await createAcademy.execute({
            location: exampleAcademy.location,
            name: exampleAcademy.name,
            responsibleEducatorId: exampleAcademy.responsibleEducatorId
        })
        expect(repository.academies.length).toBeGreaterThan(0)

    })
})