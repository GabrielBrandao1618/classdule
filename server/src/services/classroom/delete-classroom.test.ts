import {describe, it, expect} from 'vitest'
import {v4 as uuid} from 'uuid'
import {addHours, subHours} from 'date-fns'
import { Classroom } from '../../entities/classroom';
import { InMemoryClassroomRepository } from '../../repositories/in-memory/in-memory-classroom-repository'
import { DeleteClassroom } from './delete-classroom';

describe('Delete classroom tests', ()=> {
    it('Should be able to delete a classroom', async ()=> {
        const classroomRepository = new InMemoryClassroomRepository();
        const deleteClassroom = new DeleteClassroom(classroomRepository)

        const createdClassroom = new Classroom({
            academyId: uuid(),
            educatorId: uuid(),
            type: 'basic',
            weekdays: [2, 4],
            startsAt: subHours(new Date(), 1),
            endsAt: addHours(new Date(), 1)
        })
        classroomRepository.classrooms = [createdClassroom]
        expect(classroomRepository.classrooms.length).toBe(1)
        await deleteClassroom.do({
            classroomId: createdClassroom.id
        })
        expect(classroomRepository.classrooms.length).toBe(0)
    })
})