import {differenceInYears, isFuture} from 'date-fns';

import { Entity } from "./entity";

interface Props {
    name: string;
    birthDay:Date;
    currentGraduation: string;
    currentGrade: number;
    password:string;
    graduationDate: Date;
    email: string;
    academyId: string;
}

export class User extends Entity<Props> {
    constructor(props:Props, id?: string){
        if(isFuture(props.birthDay)) {
            throw new Error('Cannot create a user that is not birth yet');
        }
        const age = Math.abs(differenceInYears(new Date(), props.birthDay));
        if(age < 4){
            throw new Error('Cannot create a user that is younger than 4 years');
        }
        super(props, id);
    }

    get id(){
        return this._id;
    }

    get name(){
        return this.props.name;
    }
    set name(name:string){
        this.props.name = name;
    }
    get birthDay(){
        return this.props.birthDay;
    }
    get currentGraduation(){
        return this.props.currentGraduation;
    }
    get currentGrade(){
        return this.props.currentGrade;
    }
    get password(){
        return this.props.password;
    }
    get graduationDate(){
        return this.props.graduationDate;
    }
    get email(){
        return this.props.email;
    }
    get age(){
        return Math.abs(differenceInYears(new Date(), this.props.birthDay));
    }
    get academyId(){
        return this.props.academyId;
    }
    get spreadProps(){
        return this.props
    }
}