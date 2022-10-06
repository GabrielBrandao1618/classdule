import { subDays } from "date-fns";
import { User } from "../../entities/user";
import { getPastDate } from "./get-past-date";

export function getRandomUser(): User{
    return new User({
        birthDay: getPastDate(),
        currentGrade: 0,
        currentGraduation: 'branca',
        name: 'John Doe',
        password: 'password',
        email: 'email@email.com',
        graduationDate: subDays(new Date(), 20)
    });
}