import {describe, it, expect} from 'vitest';
import { v4 as uuid } from 'uuid';

import { addHours } from 'date-fns';

import { Classroom } from './classroom';
import { ClassroomSchedule } from './classroomSchedule';

describe('Classroom tests', ()=> {
    it('Should be able to instantiate a classroom', async ()=> {
        const classroom = new Classroom({
            educatorId: uuid(),
            type: 'Basic',
            schedules: [
                new ClassroomSchedule({
                    weekDays: [1, 3, 5],
                    startsAt: new Date(),
                    endsAt: addHours(new Date(), 2),
                })
            ]
        })
        expect(classroom).toBeInstanceOf(Classroom)
    })
})