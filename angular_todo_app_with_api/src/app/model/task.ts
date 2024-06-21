export interface ITask {
    id: number;
    task: string;
    completed: boolean;
}

export class Task {
    id: number;
    task: string;
    completed: boolean;

    constructor() {
        this.id = 0;
        this.task = '';
        this.completed = false;
    }
}

export interface ApiResponseModel {
    message: string; 
    result: string;
    data: any;
}